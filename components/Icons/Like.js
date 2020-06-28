import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Like(props) {
  return (
    <Svg viewBox="0 0 12 16" width={12} height={16} {...props} fill="red">
      <Path
        fillRule="evenodd"
        d="M8.727 3C7.091 3 6.001 4.65 6.001 4.65S4.909 3 3.273 3C1.636 3 0 4.1 0 6.3 0 9.6 6 14 6 14s6-4.4 6-7.7C12 4.1 10.364 3 8.727 3z"
      />
    </Svg>
  )
}

export default Like
