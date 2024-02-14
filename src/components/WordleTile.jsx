import { cardStates } from "../shared/constants";

export function WordleTile({tile}) {
    const match = {backgroundColor: 'green'};
    const contains = {backgroundColor: 'orange'}
    return (
      <div className='tile-container' style={tile.cardState === cardStates.MATCH ? match : tile.cardState === cardStates.CONTAINED ? contains : null}>
        <p>{tile.value}</p>
      </div>
    )
  }