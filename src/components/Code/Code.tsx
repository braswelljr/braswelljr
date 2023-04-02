import { ReactNode, Fragment } from 'react'

export function Token({
  token,
  parentTypes,
  tokenIndex,
  children
}: {
  token: string
  parentTypes?: string[]
  tokenIndex?: number
  children: ReactNode
}) {
  return <span className={`token ${tokenIndex ? token[tokenIndex] : token[0]}`}>{children}</span>
}

export function Code({
  tokens,
  parentTypes = [],
  transformTokens = x => x,
  tokenProps = {},
  tokenComponent: TokenComponent = Token
}: {
  tokens: string[] | string
  parentTypes?: string[]
  transformTokens?: (token: string, tokens: string[], i: number) => string | string[]
  tokenProps?: Record<string, unknown>
  tokenComponent?: React.ComponentType<{
    token: string
    tokens: string[]
    parentTypes: string[]
    tokenIndex?: number
    children: ReactNode
  }>
}) {
  const tokensArr = Array.isArray(tokens) ? tokens : [tokens]

  return (
    <Fragment>
      {tokensArr.map((token, i) => {
        const t = transformTokens(token, tokensArr, i)

        if (typeof t === 'string') return t

        if (t[0] === parentTypes[parentTypes.length - 1]) {
          return (
            <Code
              key={i}
              tokens={t[1]}
              parentTypes={parentTypes}
              tokenComponent={TokenComponent}
              tokenProps={tokenProps}
              transformTokens={transformTokens}
            />
          )
        }

        return (
          <TokenComponent
            key={i}
            token={t[0]}
            tokenIndex={i}
            tokens={tokensArr}
            parentTypes={parentTypes}
            {...tokenProps}
          >
            <Code
              tokens={t[1]}
              parentTypes={[...parentTypes, t[0]]}
              tokenComponent={TokenComponent}
              tokenProps={tokenProps}
              transformTokens={transformTokens}
            />
          </TokenComponent>
        )
      })}
    </Fragment>
  )
}
