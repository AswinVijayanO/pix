import * as React from "react"

import Svg, { Path } from "react-native-svg"
import ActiveBubble from './ActiveBubble';
function HomeIcon(props) {
  return (
    <ActiveBubble active={props.filled} color={props.color} title={"Home"}>
      <Svg viewBox="0 0 230.262 230.262" width={24} height={24} {...props} fill={props.color} >
        <Path d="M228.065 125.587l-51.619-51.615V23.263a7.5 7.5 0 00-7.5-7.5 7.5 7.5 0 00-7.5 7.5v35.709L120.43 17.96a7.5 7.5 0 00-10.606 0L2.197 125.587a7.5 7.5 0 000 10.606 7.502 7.502 0 0010.608 0l18.72-18.72v89.525a7.5 7.5 0 007.5 7.5H191.24a7.5 7.5 0 007.5-7.5v-89.524l18.721 18.719a7.477 7.477 0 005.303 2.196 7.478 7.478 0 005.304-2.197 7.5 7.5 0 00-.003-10.605zm-44.326 73.912H46.524v-97.025l68.604-68.604 68.611 68.606v97.023z" />
      </Svg>
    </ActiveBubble>
  )
}

export default HomeIcon;
