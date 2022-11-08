import React, { ReactNode } from 'react'
import { Placeholder } from 'src/components/placeholders'
import { MAX_ITEMS_PER_CARD } from 'src/config'
import { CarbonAd } from 'src/features/carbonAds'
import { BaseEntry } from 'src/types'

type PlaceholdersProps = {
  placeholder: ReactNode
}

const Placeholders = React.memo<PlaceholdersProps>(({ placeholder }) => {
  return (
    <>
      {[...Array(7)].map((x, i) => (
        <span key={i}>{placeholder}</span>
      ))}
    </>
  )
})

export type ListComponentPropsType<T extends BaseEntry> = {
  items: T[]
  isLoading: boolean
  renderItem: (item: T, index: number) => React.ReactNode
  withAds: boolean
  placeholder?: React.ReactNode
  refresh?: boolean
  error?: any
  limit?: number
}

export function ListComponent<T extends BaseEntry>(props: ListComponentPropsType<T>) {
  const {
    items,
    isLoading,
    error,
    renderItem,
    withAds,
    placeholder = <Placeholder />,
    limit = MAX_ITEMS_PER_CARD,
  } = props

  if (error) {
    return <p className="errorMsg">{error?.message || error}</p>
  }

  const renderItems = () => {
    if (!items) {
      return
    }

    return items.slice(0, limit).map((item, index) => {
      let content: ReactNode[] = [renderItem(item, index)]
      if (withAds && index === 0) {
        content.unshift(<CarbonAd key={'carbonAd0'} />)
      }
      return content
    })
  }

  return <>{isLoading ? <Placeholders placeholder={placeholder} /> : renderItems()}</>
}
