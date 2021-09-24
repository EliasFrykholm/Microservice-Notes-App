import { Popover } from '@material-ui/core'
import { GithubPicker, TwitterPicker } from 'react-color'
import theme from '../styles/theme'

type ColorPickerProps = {
  open: boolean
  anchor: React.RefObject<HTMLButtonElement> | null
  onClose: () => void
  onChange: (color: string) => void
  color?: string
}

const lightColors = [
  '#EB9694',
  '#FAD0C3',
  '#FEF3BD',
  '#C1E1C5',
  '#BEDADC',
  '#C4DEF6',
  '#BED3F3',
  '#D4C4FB',
]

const darkColors = [
  '#B80000',
  '#DB3E00',
  '#FCCB00',
  '#008B02',
  '#006B76',
  '#1273DE',
  '#004DCF',
  '#5300EB',
]

const ColorPicker = ({
  open,
  anchor,
  onClose,
  onChange,
  color,
}: ColorPickerProps) => {
  return (
    <Popover
      id="test"
      open={open}
      anchorEl={anchor?.current}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <GithubPicker
        color={color}
        onChangeComplete={(value) => onChange(value.hex)}
        colors={lightColors}
      />
    </Popover>
  )
}

export default ColorPicker
