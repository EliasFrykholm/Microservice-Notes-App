import {
  Card,
  Grid,
  Typography,
  IconButton,
  makeStyles,
  createStyles,
  Theme,
  TextField,
  Button,
  ListItemIcon,
  List,
  ListItem,
  Checkbox,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core'
import { Add, CheckBox, Delete, Palette } from '@material-ui/icons'
import { useRef, useState } from 'react'
import Note from '../Models/Note'
import NoteType from '../Models/NoteType'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    CreateNoteCard: {
      width: '600px',
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      cursor: 'text',
    },
    NoteContent: {
      maxHeight: '500px',
      overflow: 'auto',
    },
    InputComponent: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    TitleInput: theme.typography.h6,
    ContentInput: theme.typography.body1,
  }),
)

type FormState = {
  note?: {
    Title?: string
    Content?: string | string[]
    Created?: Date
  }
  active?: NoteType
}

const getDefaultContent = (type: NoteType): string | string[] => {
  switch (type) {
    case NoteType.List:
      return ['']
    case NoteType.Note:
      return ''
    default:
      return ''
  }
}

const getDefaultNote = (type?: NoteType): Note | undefined => {
  if (type)
    return {
      Title: '',
      Created: new Date(),
      Id: '',
      Content: getDefaultContent(type),
    }
  return undefined
}

const CreateNoteCard = () => {
  const classes = useStyles()
  const [formState, setFormState] = useState<FormState>({})

  const listInputRefs = useRef<any[]>([])

  const addListItem = () =>
    setFormState({
      ...formState,
      note: {
        ...formState.note,
        Content: [...(formState.note?.Content as string[]), ''],
      },
    })

  const handleListKeyPress = (
    e: React.KeyboardEvent<HTMLDivElement>,
    index: number,
  ) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault()
      if (index === (formState.note?.Content as string[]).length - 1) {
        addListItem()
      } else {
        listInputRefs.current[index + 1].focus()
      }
    }
  }

  const handleListNoteItemChange = (value: string, index: number) => {
    const newContent = (formState.note?.Content as string[]).slice()
    newContent[index] = value
    setFormState({
      ...formState,
      note: { ...formState.note, Content: newContent },
    })
  }

  const handleListItemDelete = (index: number) => {
    const newContent = [...(formState.note?.Content as string[])]
    newContent.splice(index, 1)
    setFormState({
      ...formState,
      note: { ...formState.note, Content: newContent },
    })
  }

  const handleListTypeChange = (type: NoteType | undefined) =>
    formState.active !== type &&
    setFormState({ note: getDefaultNote(type), active: type })

  const renderContentInput = (): JSX.Element | undefined => {
    switch (formState.active) {
      case NoteType.Note:
        return (
          <TextField
            inputProps={{
              className: classes.ContentInput,
            }}
            maxRows={15}
            variant="outlined"
            multiline
            label="Create note ..."
            value={formState.note?.Content}
            onChange={(e) => {
              setFormState({
                ...formState,
                note: { ...formState.note, Content: e.target.value },
              })
            }}
            autoFocus
            fullWidth
          />
        )
      case NoteType.List:
        return (
          <>
            <List className={classes.NoteContent}>
              {(formState.note?.Content as string[]).map((value, index) => (
                <ListItem>
                  <ListItemIcon>
                    <Checkbox />
                  </ListItemIcon>
                  <TextField
                    fullWidth
                    label="Todo item"
                    value={value}
                    onChange={(e) =>
                      handleListNoteItemChange(e.target.value, index)
                    }
                    onKeyDown={(e) => handleListKeyPress(e, index)}
                    inputRef={(ref) => {
                      listInputRefs.current[index] = ref
                    }}
                    autoFocus={
                      index === (formState.note?.Content as string[]).length - 1
                    }
                  />
                  {(formState.note?.Content as string[]).length > 1 && (
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
                <ListItemText>Add Todo</ListItemText>
              </ListItem>
            </List>
          </>
        )
      default:
        return undefined
    }
  }

  return (
    <Card
      className={classes.CreateNoteCard}
      elevation={3}
      onClick={() => !formState.active && handleListTypeChange(NoteType.Note)}
    >
      {formState.active !== undefined ? (
        <Grid
          container
          spacing={2}
          direction="column"
          className={classes.InputComponent}
        >
          <Grid item>
            <TextField
              fullWidth
              variant="outlined"
              inputProps={{
                className: classes.TitleInput,
              }}
              label="Title"
            />
          </Grid>
          <Grid item>{renderContentInput()}</Grid>
          <Grid item container direction="row">
            <Grid item>
              <IconButton>
                <Palette />
              </IconButton>
            </Grid>
            <Grid item xs container justifyContent="flex-end">
              <Button
                onClick={(e) => {
                  handleListTypeChange(undefined)
                }}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2} direction="column">
          <Grid item container spacing={2} alignItems="center">
            <Grid item xs>
              <Typography variant="body1">Create note ...</Typography>
            </Grid>
            <Grid item>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation()
                  handleListTypeChange(NoteType.List)
                }}
              >
                <CheckBox />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Card>
  )
}

export default CreateNoteCard
