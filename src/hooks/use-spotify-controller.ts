import { useEffect, useRef, useState } from 'react';
import { useAsRef } from '@/hooks/use-as-ref';

/** The parts of Spotify's iFrame API the player uses.
 *  https://developer.spotify.com/documentation/embeds/references/iframe-api */
type PlaybackEvent = {
  data: { isPaused: boolean; isBuffering: boolean; duration: number; position: number };
};

type SpotifyController = {
  loadUri(uri: string): void;
  play(): void;
  togglePlay(): void;
  /** Jump to a point in the track, in seconds. */
  seek(seconds: number): void;
  destroy(): void;
  addListener(event: 'ready', listener: () => void): void;
  addListener(event: 'playback_update', listener: (event: PlaybackEvent) => void): void;
};

type SpotifyIframeApi = {
  createController(
    element: HTMLElement,
    options: { uri: string; width?: string | number; height?: string | number },
    callback: (controller: SpotifyController) => void
  ): void;
};

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: SpotifyIframeApi) => void;
  }
}

const API_SRC = 'https://open.spotify.com/embed/iframe-api/v1';

let apiPromise: Promise<SpotifyIframeApi> | undefined;

/** Load Spotify's script once for the whole session, however many times a
 *  player opens. A failed load is forgotten so the next attempt can retry. */
function loadSpotifyIframeApi(): Promise<SpotifyIframeApi> {
  apiPromise ??= new Promise<SpotifyIframeApi>((resolve, reject) => {
    window.onSpotifyIframeApiReady = resolve;

    const script = document.createElement('script');
    script.src = API_SRC;
    script.async = true;
    script.onerror = () => {
      apiPromise = undefined;
      script.remove();
      reject(new Error('Could not load the Spotify player'));
    };
    document.body.appendChild(script);
  });

  return apiPromise;
}

export type SpotifyPlayback = {
  /** `loading` until Spotify reports in, `failed` if its script never loads. */
  status: 'loading' | 'ready' | 'failed';
  isPlaying: boolean;
  /** Milliseconds into what Spotify is willing to play. */
  position: number;
  /** Milliseconds Spotify will play: the whole song for a signed-in listener,
   *  a preview otherwise. That choice is Spotify's, not this site's. */
  duration: number;
};

const INITIAL: SpotifyPlayback = { status: 'loading', isPlaying: false, position: 0, duration: 0 };

/** Closer than this to the end counts as having finished. Spotify reports
 *  progress about once a second, so the last report can land this far short. */
const END_MARGIN_MS = 1200;

/**
 * Drives one Spotify embed inside the element the returned ref is attached to.
 *
 * The embed is created once and re-pointed when `trackId` changes, so switching
 * songs does not rebuild the player. It reports back whether the song is
 * actually playing, which a plain iframe cannot tell its page, and calls
 * `onEnded` when a song plays through.
 */
export function useSpotifyController(trackId: string, { onEnded }: { onEnded?: () => void } = {}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<SpotifyController | null>(null);
  const trackIdRef = useRef(trackId);
  const onEndedRef = useAsRef(onEnded);
  /** True once the current song has been heard, so a song that has only just
   *  loaded is never taken for one that has finished. */
  const wasPlayingRef = useRef(false);
  /** True once the current song's end has been announced, so it is said once. */
  const endedRef = useRef(false);
  const [playback, setPlayback] = useState<SpotifyPlayback>(INITIAL);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let cancelled = false;

    loadSpotifyIframeApi()
      .then((api) => {
        if (cancelled) return;

        // Spotify swaps the element it is given for its iframe, so it gets one
        // React does not own.
        const mount = document.createElement('div');
        host.appendChild(mount);

        api.createController(
          mount,
          { uri: `spotify:track:${trackIdRef.current}`, width: '100%', height: 80 },
          (controller) => {
            if (cancelled) return controller.destroy();
            controllerRef.current = controller;

            controller.addListener('ready', () => {
              setPlayback((current) => ({ ...current, status: 'ready' }));
              controller.play();
            });
            controller.addListener('playback_update', ({ data }) => {
              const isPlaying = !data.isPaused && !data.isBuffering;
              // Spotify does not report a pause when a song runs out. It simply
              // stops counting, still marked as playing, so the end is read
              // from the position alone.
              const finished =
                wasPlayingRef.current &&
                !endedRef.current &&
                data.duration > 0 &&
                data.position >= data.duration - END_MARGIN_MS;

              if (isPlaying) wasPlayingRef.current = true;
              setPlayback({
                status: 'ready',
                isPlaying,
                position: data.position,
                duration: data.duration
              });

              if (finished) {
                endedRef.current = true;
                onEndedRef.current?.();
              }
            });
          }
        );
      })
      .catch(() => {
        if (!cancelled) setPlayback({ ...INITIAL, status: 'failed' });
      });

    return () => {
      cancelled = true;
      controllerRef.current?.destroy();
      controllerRef.current = null;
      host.replaceChildren();
    };
  }, [onEndedRef]);

  useEffect(() => {
    if (trackIdRef.current === trackId) return;
    trackIdRef.current = trackId;
    wasPlayingRef.current = false;
    endedRef.current = false;

    const controller = controllerRef.current;
    if (!controller) return;
    controller.loadUri(`spotify:track:${trackId}`);
    controller.play();
  }, [trackId]);

  return {
    hostRef,
    playback,
    toggle: () => controllerRef.current?.togglePlay(),
    seek: (ms: number) => controllerRef.current?.seek(ms / 1000)
  };
}
