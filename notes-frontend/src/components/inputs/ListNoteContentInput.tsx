import {
  TextField,
  makeStyles,
  createStyles,
  Theme,
  List,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
  ListItemText,
} from '@material-ui/core'
import { Add, Delete } from '@material-ui/icons'
import { BaseCSSProperties } from '@material-ui/styles'
import { useRef } from 'react'

type ListNoteContentInputProps = {
  items: string[]
  onChange: (items: string[]) => void
  maxHeight: string | undefined
}

const useStyles = makeStyles<Theme, BaseCSSProperties>((theme: Theme) =>
  createStyles({
    noteContent: {
      maxHeight: (props) => props.maxHeight,
      overflow: 'auto',
    },
  }),
)

const ListNoteContentInput = ({
  items,
  onChange,
  ...props
}: ListNoteContentInputProps) => {
  const classes = useStyles(props)

  const listInputRefs = useRef<any[]>([])

  const handleListNoteItemChange = (value: string, index: number) => {
    const newItems = [...items]
    newItems[index] = value
    onChange(newItems)
  }

  const handleListItemDelete = (index: number) => {
    const newItems = [...items]
    newItems.splice(index, 1)
    onChange(newItems)
  }

  const addListItem = () => {
    const newItems = [...items, '']
    onChange(newItems)
  }

  const handleListKeyPress = (
    e: React.KeyboardEvent<HTMLDivElement>,
    index: number,
  ) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault()
      if (index === items.length - 1) {
        addListItem()
      } else {
        listInputRefs.current[index + 1].focus()
      }
    }
  }

  return (
    <List className={classes.NoteContent}>
      {items.map((value, index) => (
        <ListItem>
          <ListItemIcon>
            <Checkbox />
          </ListItemIcon>
          <TextField
            fullWidth
            label="Todo item"
            value={value}
            onChange={(e) => handleListNoteItemChange(e.target.value, index)}
            onKeyDown={(e) => handleListKeyPress(e, index)}
            inputRef={(ref) => {
              listInputRefs.current[index] = ref
            }}
            autoFocus={index === items.length - 1}
          />
          {items.length > 1 && (
            <ListItemSecondaryAction>
              <IconButton onClick={() => handleListItemDelete(index)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          )}
        </ListItem>
      ))}
      <ListItem button onClick={addListItem}>
        <ListItemIcon>
          <Add />
        </ListItemIcon>
        <ListItemText>Add Todo Item</ListItemText>
      </ListItem>
    </List>
  )
}

export default ListNoteContentInput
