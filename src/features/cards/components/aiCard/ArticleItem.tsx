import { BiCommentDetail } from 'react-icons/bi'
import { MdCreditScore } from "react-icons/md"
import { GoDotFill } from 'react-icons/go'
import { MdAccessTime } from 'react-icons/md'
import { CardItemWithActions, CardLink } from 'src/components/Elements'
import { Attributes } from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'
import { Article, BaseItemPropsType } from 'src/types'
import { format } from 'timeago.js'

const ArticleItem = (props: BaseItemPropsType<Article>) => {
  const { item, index, analyticsTag } = props
  const { listingMode } = useUserPreferences()

  return (
    <CardItemWithActions
      source={analyticsTag}
      index={index}
      item={item}
      key={index}
      cardItem={
        <>
          <p className="rowTitle">
            <CardLink
              link={item.url}
              className="titleWithCover"
              analyticsAttributes={{
                [Attributes.POINTS]: item.reactions,
                [Attributes.TRIGERED_FROM]: 'card',
                [Attributes.TITLE]: item.title,
                [Attributes.LINK]: item.url,
                [Attributes.SOURCE]: analyticsTag,
              }}>
              {item.image_url && listingMode === 'normal' && (
                <img src={item.image_url} className="rowCover" alt="" />
              )}
              <span className="subTitle">{item.title}</span>
            </CardLink>
          </p>
          <p className="rowDescription">{item.description}</p>
          {listingMode === 'compact' && (
            <div className="rowDetails">
              <span className="rowItem capitalize">
                <GoDotFill className="rowItemIcon" /> {item.source}
              </span>
            </div>
          )}
          {listingMode === 'normal' && (
            <div className="rowDetails">
              <span className="rowItem capitalize">
                <GoDotFill className="rowItemIcon" /> {item.source}
              </span>
              <span className="rowItem" title={new Date(item.published_at).toUTCString()}>
                <MdAccessTime className="rowItemIcon" /> {format(new Date(item.published_at))}
              </span>
              <span className="rowItem" style={{color: '#FB6720'}}>
                <MdCreditScore className={'rowTitleIcon'} color="#FB6720" />
                {item.score && item.score.toFixed(1)}
              </span>
            </div>
          )}
        </>
      }
    />
  )
}

export default ArticleItem
