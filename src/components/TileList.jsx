import { WordleTile } from "./WordleTile"

export function TileList({tileRow = []}) {
    return (
      tileRow.map((tile,index) => {
        return <WordleTile key={index} tile={tile} />
      })
    )
  }