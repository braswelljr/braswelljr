'use client';

import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { AnimatePresence, motion, Transition } from 'motion/react';
import { cn } from 'lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from './drawer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from './dropdown-menu';

const DropDrawerContext = createContext<{ isMobile: boolean }>({
  isMobile: false
});

const useDropDrawerContext = () => {
  const context = useContext(DropDrawerContext);
  if (!context) {
    throw new Error('DropDrawer components cannot be rendered outside the Context');
  }
  return context;
};

function DropDrawer({
  children,
  ...props
}: React.ComponentProps<typeof Drawer> | React.ComponentProps<typeof DropdownMenu>) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <DropDrawerContext.Provider value={{ isMobile }}>
        <Drawer
          data-slot="drop-drawer"
          {...(props as React.ComponentProps<typeof Drawer>)}
        >
          {children}
        </Drawer>
      </DropDrawerContext.Provider>
    );
  }

  return (
    <DropDrawerContext.Provider value={{ isMobile: false }}>
      <DropdownMenu
        data-slot="drop-drawer"
        {...(props as React.ComponentProps<typeof DropdownMenu>)}
      >
        {children}
      </DropdownMenu>
    </DropDrawerContext.Provider>
  );
}

function DropDrawerTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerTrigger> | React.ComponentProps<typeof DropdownMenuTrigger>) {
  const { isMobile } = useDropDrawerContext();

  if (isMobile) {
    return (
      <DrawerTrigger
        data-slot="drop-drawer-trigger"
        className={className}
        {...(props as React.ComponentProps<typeof DrawerTrigger>)}
      >
        {children}
      </DrawerTrigger>
    );
  }

  return (
    <DropdownMenuTrigger
      data-slot="drop-drawer-trigger"
      className={className}
      {...(props as React.ComponentProps<typeof DropdownMenuTrigger>)}
    >
      {children}
    </DropdownMenuTrigger>
  );
}

function DropDrawerContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerContent> | React.ComponentProps<typeof DropdownMenuContent>) {
  const { isMobile } = useDropDrawerContext();
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [submenuTitle, setSubmenuTitle] = useState<string | null>(null);
  const [submenuStack, setSubmenuStack] = useState<{ id: string; title: string }[]>([]);
  // Add animation direction state
  const [animationDirection, setAnimationDirection] = useState<'forward' | 'backward'>('forward');

  // Function to navigate to a submenu
  const navigateToSubmenu = useCallback((id: string, title: string) => {
    // Set animation direction to forward when navigating to a submenu
    setAnimationDirection('forward');
    setActiveSubmenu(id);
    setSubmenuTitle(title);
    setSubmenuStack((prev) => [...prev, { id, title }]);
  }, []);

  // Function to go back to previous menu
  const goBack = useCallback(() => {
    // Set animation direction to backward when going back
    setAnimationDirection('backward');

    if (submenuStack.length <= 1) {
      // If we're at the first level, go back to main menu
      setActiveSubmenu(null);
      setSubmenuTitle(null);
      setSubmenuStack([]);
    } else {
      // Go back to previous submenu
      const newStack = [...submenuStack];
      newStack.pop(); // Remove current
      const previous = newStack[newStack.length - 1];
      setActiveSubmenu(previous.id);
      setSubmenuTitle(previous.title);
      setSubmenuStack(newStack);
    }
  }, [submenuStack]);

  // No-op: content is derived reactively via useMemo below; registration is no longer needed
  const registerSubmenuContent = useCallback((_id: string, _content: React.ReactNode[]) => {}, []);

  // Function to extract submenu content
  const extractSubmenuContent = useCallback(
    (elements: React.ReactNode, targetId: string): React.ReactNode[] => {
      const result: React.ReactNode[] = [];

      // Recursive function to search through all children
      const findSubmenuContent = (node: React.ReactNode) => {
        // Skip if not a valid element
        if (!isValidElement(node)) return;

        const element = node as React.ReactElement;
        // Use a more specific type to avoid 'any'
        const props = element.props as {
          id?: string;
          'data-submenu-id'?: string;
          children?: React.ReactNode;
        };

        // Check if this is a DropDrawerSub
        if (element.type === DropDrawerSub) {
          // Get all possible ID values
          const elementId = props.id;
          const dataSubmenuId = props['data-submenu-id'];

          // If this is the submenu we're looking for
          if (elementId === targetId || dataSubmenuId === targetId) {
            // Find the SubContent within this Sub
            if (props.children) {
              Children.forEach(props.children, (child) => {
                if (isValidElement(child) && child.type === DropDrawerSubContent) {
                  // Add all children of the SubContent to the result
                  const subContentProps = child.props as {
                    children?: React.ReactNode;
                  };
                  if (subContentProps.children) {
                    Children.forEach(subContentProps.children, (contentChild) => {
                      result.push(contentChild);
                    });
                  }
                }
              });
            }
            return; // Found what we needed, no need to search deeper
          }
        }

        // If this element has children, search through them
        if (props.children) {
          if (Array.isArray(props.children)) {
            props.children.forEach((child: React.ReactNode) => findSubmenuContent(child));
          } else {
            findSubmenuContent(props.children);
          }
        }
      };

      // Start the search from the root elements
      if (Array.isArray(elements)) {
        elements.forEach((child) => findSubmenuContent(child));
      } else {
        findSubmenuContent(elements);
      }

      return result;
    },
    []
  );

  // Derive active submenu content reactively — avoids reading refs during render
  const activeSubmenuContent = useMemo(() => {
    if (!activeSubmenu) return [];
    return extractSubmenuContent(children, activeSubmenu);
  }, [activeSubmenu, children, extractSubmenuContent]);

  // Animation variants for Framer Motion
  const variants = {
    enter: (direction: 'forward' | 'backward') => ({
      x: direction === 'forward' ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: 'forward' | 'backward') => ({
      x: direction === 'forward' ? '-100%' : '100%',
      opacity: 0
    })
  };

  // Animation transition
  const transition: Transition = {
    duration: 0.3,
    ease: [0.25, 0.1, 0.25, 1.0] // cubic-bezier easing
  };

  if (isMobile) {
    return (
      <SubmenuContext.Provider
        value={{
          activeSubmenu,
          setActiveSubmenu: (id) => {
            if (id === null) {
              setActiveSubmenu(null);
              setSubmenuTitle(null);
              setSubmenuStack([]);
            }
          },
          submenuTitle,
          setSubmenuTitle,
          navigateToSubmenu,
          registerSubmenuContent
        }}
      >
        <DrawerContent
          data-slot="drop-drawer-content"
          className={cn('max-h-[90vh]', className)}
          {...(props as React.ComponentProps<typeof DrawerContent>)}
        >
          {activeSubmenu ? (
            <>
              <DrawerHeader>
                <div className="flex items-center gap-2">
                  <button
                    onClick={goBack}
                    className="rounded-full p-1 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50"
                  >
                    <ChevronLeftIcon className="h-5 w-5" />
                  </button>
                  <DrawerTitle>{submenuTitle || 'Submenu'}</DrawerTitle>
                  <DrawerDescription className="sr-only">
                    {submenuTitle || 'Submenu'}
                  </DrawerDescription>
                </div>
              </DrawerHeader>
              <div className="relative max-h-[70vh] flex-1 overflow-y-auto">
                {/* Use AnimatePresence to handle exit animations */}
                <AnimatePresence
                  initial={false}
                  mode="wait"
                  custom={animationDirection}
                >
                  <motion.div
                    key={activeSubmenu || 'main'}
                    custom={animationDirection}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={transition}
                    className="h-full w-full space-y-1.5 pb-6"
                  >
                    {activeSubmenu ? activeSubmenuContent : children}
                  </motion.div>
                </AnimatePresence>
              </div>
            </>
          ) : (
            <>
              <DrawerHeader className="sr-only">
                <DrawerTitle>Menu</DrawerTitle>
              </DrawerHeader>
              <div className="max-h-[70vh] overflow-y-auto">
                <AnimatePresence
                  initial={false}
                  mode="wait"
                  custom={animationDirection}
                >
                  <motion.div
                    key="main-menu"
                    custom={animationDirection}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={transition}
                    className="w-full space-y-1.5 pb-6"
                  >
                    {children}
                  </motion.div>
                </AnimatePresence>
              </div>
            </>
          )}
        </DrawerContent>
      </SubmenuContext.Provider>
    );
  }

  return (
    <SubmenuContext.Provider
      value={{
        activeSubmenu,
        setActiveSubmenu,
        submenuTitle,
        setSubmenuTitle,
        registerSubmenuContent
      }}
    >
      <DropdownMenuContent
        data-slot="drop-drawer-content"
        align="end"
        sideOffset={4}
        className={cn(
          'max-h-(--radix-dropdown-menu-content-available-height) min-w-55 overflow-y-auto',
          className
        )}
        {...props}
      >
        {children}
      </DropdownMenuContent>
    </SubmenuContext.Provider>
  );
}

function DropDrawerItem({
  className,
  children,
  onSelect,
  onClick,
  icon,
  variant = 'default',
  inset,
  disabled,
  render: _render,
  closeOnClick: _closeOnClick,
  nativeButton: _nativeButton,
  label: _label,
  ...props
}: React.ComponentProps<typeof DropdownMenuItem> & {
  icon?: React.ReactNode;
  variant?: 'default' | 'destructive';
}) {
  const { isMobile } = useDropDrawerContext();

  // Define hooks outside of conditionals to follow React rules
  // Check if this item is inside a group by looking at parent elements
  const isInGroup = useCallback((element: HTMLElement | null): boolean => {
    if (!element) return false;

    // Check if any parent has a data-drop-drawer-group attribute
    let parent = element.parentElement;
    while (parent) {
      if (parent.hasAttribute('data-drop-drawer-group')) {
        return true;
      }
      parent = parent.parentElement;
    }
    return false;
  }, []);

  // Create a ref to check if the item is in a group
  const itemRef = useRef<HTMLDivElement>(null);
  const [isInsideGroup, setIsInsideGroup] = useState(false);

  useEffect(() => {
    // Only run this effect in mobile mode
    if (!isMobile) return;

    // Use a short timeout to ensure the DOM is fully rendered
    const timer = setTimeout(() => {
      if (itemRef.current) {
        setIsInsideGroup(isInGroup(itemRef.current));
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [isInGroup, isMobile]);

  if (isMobile) {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      if (onClick) (onClick as React.MouseEventHandler<HTMLDivElement>)(e);
      if (onSelect) (onSelect as unknown as (e: Event) => void)(e.nativeEvent);
    };

    // Only wrap in DrawerClose if it's not a submenu item
    const content = (
      <div
        ref={itemRef}
        data-slot="drop-drawer-item"
        data-variant={variant}
        data-inset={inset}
        data-disabled={disabled}
        className={cn(
          'flex cursor-pointer items-center justify-between px-4 py-4',
          // Only apply margin, background and rounded corners if not in a group
          !isInsideGroup && 'mx-2 my-1.5 rounded-md bg-neutral-100 dark:bg-neutral-800',
          // For items in a group, don't add background but add more padding
          isInsideGroup && 'bg-transparent py-4',
          inset && 'pl-8',
          variant === 'destructive' && 'text-red-500 dark:dark:text-red-900 dark:text-red-500',
          disabled && 'pointer-events-none opacity-50',
          className
        )}
        onClick={handleClick}
        aria-disabled={disabled}
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      >
        <div className="flex items-center gap-2">{children}</div>
        {icon && <div className="shrink-0">{icon}</div>}
      </div>
    );

    // Check if this is inside a submenu
    const isInSubmenu =
      (props as Record<string, unknown>)['data-parent-submenu-id'] ||
      (props as Record<string, unknown>)['data-parent-submenu'];

    if (isInSubmenu) {
      return content;
    }

    return <DrawerClose render={content} />;
  }

  return (
    <DropdownMenuItem
      data-slot="drop-drawer-item"
      data-variant={variant}
      data-inset={inset}
      className={className}
      onSelect={onSelect}
      onClick={onClick as React.MouseEventHandler<HTMLDivElement>}
      inset={inset}
      disabled={disabled}
      {...props}
    >
      <div className="flex w-full items-center justify-between">
        <div>{children}</div>
        {icon && <div>{icon}</div>}
      </div>
    </DropdownMenuItem>
  );
}

function DropDrawerSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuSeparator>) {
  const { isMobile } = useDropDrawerContext();

  // For mobile, render a simple divider
  if (isMobile) {
    return null;
  }

  // For desktop, use the standard dropdown separator
  return (
    <DropdownMenuSeparator
      data-slot="drop-drawer-separator"
      className={className}
      {...props}
    />
  );
}

function DropDrawerLabel({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuLabel> | React.ComponentProps<typeof DrawerTitle>) {
  const { isMobile } = useDropDrawerContext();

  if (isMobile) {
    return (
      <DrawerHeader className="p-0">
        <DrawerTitle
          data-slot="drop-drawer-label"
          className={cn(
            'px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-400',
            className
          )}
          {...props}
        >
          {children}
        </DrawerTitle>
      </DrawerHeader>
    );
  }

  return (
    <DropdownMenuLabel
      data-slot="drop-drawer-label"
      className={className}
      {...props}
    >
      {children}
    </DropdownMenuLabel>
  );
}

function DropDrawerFooter({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerFooter> | React.ComponentProps<'div'>) {
  const { isMobile } = useDropDrawerContext();

  if (isMobile) {
    return (
      <DrawerFooter
        data-slot="drop-drawer-footer"
        className={cn('p-4', className)}
        {...props}
      >
        {children}
      </DrawerFooter>
    );
  }

  // No direct equivalent in DropdownMenu, so we'll just render a div
  return (
    <div
      data-slot="drop-drawer-footer"
      className={cn('p-2', className)}
      {...props}
    >
      {children}
    </div>
  );
}

function DropDrawerGroup({
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  children: React.ReactNode;
}) {
  const { isMobile } = useDropDrawerContext();

  // Add separators between children on mobile
  const childrenWithSeparators = useMemo(() => {
    if (!isMobile) return children;

    const childArray = Children.toArray(children);

    // Filter out any existing separators
    const filteredChildren = childArray.filter(
      (child) => isValidElement(child) && child.type !== DropDrawerSeparator
    );

    // Add separators between items
    return filteredChildren.flatMap((child, index) => {
      if (index === filteredChildren.length - 1) return [child];
      return [
        child,
        <div
          key={`separator-${index}`}
          className="h-px bg-neutral-200 dark:bg-neutral-800"
          aria-hidden="true"
        />
      ];
    });
  }, [children, isMobile]);

  if (isMobile) {
    return (
      <div
        data-drop-drawer-group
        data-slot="drop-drawer-group"
        role="group"
        className={cn(
          'mx-2 my-3 overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800 dark:dark:bg-neutral-800',
          className
        )}
        {...props}
      >
        {childrenWithSeparators}
      </div>
    );
  }

  // On desktop, use a div with proper role and attributes
  return (
    <div
      data-drop-drawer-group
      data-slot="drop-drawer-group"
      role="group"
      className={className}
      {...props}
    >
      {children}
    </div>
  );
}

// Context for managing submenu state on mobile
interface SubmenuContextType {
  activeSubmenu: string | null;
  setActiveSubmenu: (id: string | null) => void;
  submenuTitle: string | null;
  setSubmenuTitle: (title: string | null) => void;
  navigateToSubmenu?: (id: string, title: string) => void;
  registerSubmenuContent?: (id: string, content: React.ReactNode[]) => void;
}

const SubmenuContext = createContext<SubmenuContextType>({
  activeSubmenu: null,
  setActiveSubmenu: () => {},
  submenuTitle: null,
  setSubmenuTitle: () => {},
  navigateToSubmenu: undefined,
  registerSubmenuContent: undefined
});

// Submenu components
// Counter for generating simple numeric IDs
let submenuIdCounter = 0;

function DropDrawerSub({
  children,
  id,
  ...props
}: React.ComponentProps<typeof DropdownMenuSub> & {
  id?: string;
}) {
  const { isMobile } = useDropDrawerContext();
  const { registerSubmenuContent } = useContext(SubmenuContext);

  // Generate a simple numeric ID instead of using useId()
  const [generatedId] = useState(() => `submenu-${submenuIdCounter++}`);
  const submenuId = id || generatedId;

  // Extract submenu content to register with parent
  useEffect(() => {
    if (!registerSubmenuContent) return;

    // Find the SubContent within this Sub
    const contentItems: React.ReactNode[] = [];
    if (typeof children !== 'function') {
      Children.forEach(children, (child) => {
        if (isValidElement(child) && child.type === DropDrawerSubContent) {
          // Add all children of the SubContent to the result
          Children.forEach(
            (child.props as { children?: React.ReactNode }).children,
            (contentChild) => {
              contentItems.push(contentChild);
            }
          );
        }
      });
    }

    // Register the content with the parent
    if (contentItems.length > 0) {
      registerSubmenuContent(submenuId, contentItems);
    }
  }, [children, registerSubmenuContent, submenuId]);

  if (isMobile) {
    // For mobile, we'll use the context to manage submenu state
    // Process children to pass the submenu ID to the trigger and content
    const processedChildren =
      typeof children !== 'function'
        ? Children.map(children, (child) => {
            if (!isValidElement(child)) return child;

            if (child.type === DropDrawerSubTrigger) {
              return cloneElement(
                child as React.ReactElement,
                {
                  ...(child.props as object),
                  'data-parent-submenu-id': submenuId,
                  'data-submenu-id': submenuId,
                  // Use only data attributes, not custom props
                  'data-parent-submenu': submenuId
                } as React.HTMLAttributes<HTMLElement>
              );
            }

            if (child.type === DropDrawerSubContent) {
              return cloneElement(
                child as React.ReactElement,
                {
                  ...(child.props as object),
                  'data-parent-submenu-id': submenuId,
                  'data-submenu-id': submenuId,
                  // Use only data attributes, not custom props
                  'data-parent-submenu': submenuId
                } as React.HTMLAttributes<HTMLElement>
              );
            }

            return child;
          })
        : null;

    return (
      <div
        data-slot="drop-drawer-sub"
        data-submenu-id={submenuId}
        id={submenuId}
      >
        {processedChildren}
      </div>
    );
  }

  // For desktop, pass the generated ID to the DropdownMenuSub
  return (
    <DropdownMenuSub
      data-slot="drop-drawer-sub"
      data-submenu-id={submenuId}
      // Don't pass id to DropdownMenuSub as it doesn't accept this prop
      {...props}
    >
      {children}
    </DropdownMenuSub>
  );
}

function DropDrawerSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuSubTrigger> & {
  icon?: React.ReactNode;
}) {
  const { isMobile } = useDropDrawerContext();
  const { navigateToSubmenu } = useContext(SubmenuContext);

  // Define hooks outside of conditionals to follow React rules
  // Check if this item is inside a group by looking at parent elements
  const isInGroup = useCallback((element: HTMLElement | null): boolean => {
    if (!element) return false;

    // Check if any parent has a data-drop-drawer-group attribute
    let parent = element.parentElement;
    while (parent) {
      if (parent.hasAttribute('data-drop-drawer-group')) {
        return true;
      }
      parent = parent.parentElement;
    }
    return false;
  }, []);

  // Create a ref to check if the item is in a group
  const itemRef = useRef<HTMLDivElement>(null);
  const [isInsideGroup, setIsInsideGroup] = useState(false);

  useEffect(() => {
    // Only run this effect in mobile mode
    if (!isMobile) return;

    // Use a short timeout to ensure the DOM is fully rendered
    const timer = setTimeout(() => {
      if (itemRef.current) {
        setIsInsideGroup(isInGroup(itemRef.current));
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [isInGroup, isMobile]);

  if (isMobile) {
    // Find the parent submenu ID
    const handleClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      // Get the closest parent with data-submenu-id attribute
      const element = e.currentTarget as HTMLElement;
      let submenuId: string | null = null;

      // First check if the element itself has the data attribute
      if (element.closest('[data-submenu-id]')) {
        const closestElement = element.closest('[data-submenu-id]');
        const id = closestElement?.getAttribute('data-submenu-id');
        if (id) {
          submenuId = id;
        }
      }

      // If not found, try props
      if (!submenuId) {
        submenuId =
          ((props as Record<string, unknown>)['data-parent-submenu-id'] as string) ||
          ((props as Record<string, unknown>)['data-parent-submenu'] as string);
      }

      if (!submenuId) {
        return;
      }

      // Get the title
      const title = typeof children === 'string' ? children : 'Submenu';

      // Navigate to the submenu
      if (navigateToSubmenu) {
        navigateToSubmenu(submenuId, title);
      }
    };

    // Combine onClick handlers
    const combinedOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
      // Call the original onClick if provided
      const typedProps = props as Record<string, unknown>;
      if (typedProps.onClick) {
        const originalOnClick = typedProps.onClick as React.MouseEventHandler<HTMLDivElement>;
        originalOnClick(e as React.MouseEvent<HTMLDivElement, MouseEvent>);
      }

      // Call our navigation handler
      handleClick(e as unknown as MouseEvent);
    };

    // Remove onClick from props to avoid duplicate handlers
    const { ...restProps } = props as Record<string, unknown>;

    // Don't wrap in DrawerClose for submenu triggers
    return (
      <div
        ref={itemRef}
        data-slot="drop-drawer-sub-trigger"
        data-inset={inset}
        className={cn(
          'flex cursor-pointer items-center justify-between px-4 py-4',
          // Only apply margin, background and rounded corners if not in a group
          !isInsideGroup &&
            'mx-2 my-1.5 rounded-md bg-neutral-100 dark:bg-neutral-800 dark:dark:bg-neutral-800',
          // For items in a group, don't add background but add more padding
          isInsideGroup && 'bg-transparent py-4',
          inset && 'pl-8',
          className
        )}
        onClick={combinedOnClick}
        {...restProps}
      >
        <div className="flex items-center gap-2">{children}</div>
        <ChevronRightIcon className="h-5 w-5" />
      </div>
    );
  }

  return (
    <DropdownMenuSubTrigger
      data-slot="drop-drawer-sub-trigger"
      data-inset={inset}
      className={className}
      inset={inset}
      {...props}
    >
      {children}
    </DropdownMenuSubTrigger>
  );
}

function DropDrawerSubContent({
  className,
  sideOffset = 4,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuSubContent>) {
  const { isMobile } = useDropDrawerContext();

  if (isMobile) {
    // For mobile, we don't render the content directly
    // It will be rendered by the DropDrawerContent component when active
    return null;
  }

  return (
    <DropdownMenuSubContent
      data-slot="drop-drawer-sub-content"
      sideOffset={sideOffset}
      className={cn(
        'z-101 min-w-32 overflow-hidden rounded-md border border-neutral-200 p-1 shadow-lg dark:border-neutral-800',
        className
      )}
      {...props}
    >
      {children}
    </DropdownMenuSubContent>
  );
}

export {
  DropDrawer,
  DropDrawerContent,
  DropDrawerFooter,
  DropDrawerGroup,
  DropDrawerItem,
  DropDrawerLabel,
  DropDrawerSeparator,
  DropDrawerSub,
  DropDrawerSubContent,
  DropDrawerSubTrigger,
  DropDrawerTrigger
};
