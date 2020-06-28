import * as React from "react"
import Svg, { Path } from "react-native-svg"
import ActiveBubble from './ActiveBubble';
function Collection(props) {
  return (
    <ActiveBubble active={props.filled} color={props.color} title={"Collection"}>
      <Svg viewBox="0 0 32 32" width={24} height={24} {...props} fill={props.color}>
        <Path d="M26.662 8.536v-4.265h-25.057v19.192h3.732v4.265h25.057v-19.192h-3.732zm-23.99 13.862v-17.06h22.924v3.199h-20.259v13.861h-2.666zm26.656 4.265h-22.924v-17.06h22.924v17.06z">

        </Path>
      </Svg>
    </ActiveBubble>
  )
}

export default Collection
