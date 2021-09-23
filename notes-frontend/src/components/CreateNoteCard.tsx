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
import NoteType from '../Models/NoteType'
import useOutsideClick from '../hooks/useOutsideClick'

type CreateNoteCardProps = {
  onSubmit: (content: string | string[], title?: string) => void
}

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
  Title?: string
  Content?: string | string[]
  active?: NoteType
}

const isInputOk = (title?: string, content?: string | string[]) => {
  if (content && Array.isArray(content) && content.some((e) => e)) {
    return true
  }
  if (title) {
    return true
  }
  if (content?.toString()) {
    return true
  }
  return false
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

const getDefaultState = (type?: NoteType): FormState => {
  if (type !== undefined)
    return {
      Title: '',
      Content: getDefaultContent(type),
      active: type,
    }
  return {}
}

const CreateNoteCard = ({ onSubmit }: CreateNoteCardProps) => {
  const classes = useStyles()
  const [formState, setFormState] = useState<FormState>({})

  const listInputRefs = useRef<any[]>([])
  const wrapperRef = useRef(null)

  const handleSubmit = () => {
    if (isInputOk(formState.Title, formState.Content)) {
      onSubmit(formState.Content as string | string[], formState.Title)
    }
    setFormState(getDefaultState())
  }

  useOutsideClick(
    wrapperRef,
    () => formState.active !== undefined && handleSubmit(),
  )

  const addListItem = () =>
    setFormState({
      ...formState,
      Content: [...(formState.Content as string[]), ''],
    })

  const handleListKeyPress = (
    e: React.KeyboardEvent<HTMLDivElement>,
    index: number,
  ) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault()
      if (index === (formState.Content as string[]).length - 1) {
        addListItem()
      } else {
        listInputRefs.current[index + 1].focus()
      }
    }
  }

  const handleListNoteItemChange = (value: string, index: number) => {
    const newContent = (formState.Content as string[]).slice()
    newContent[index] = value
    setFormState({
      ...formState,
      Content: newContent,
    })
  }

  const handleListItemDelete = (index: number) => {
    const newContent = [...(formState.Content as string[])]
    newContent.splice(index, 1)
    setFormState({
      ...formState,
      Content: newContent,
    })
  }

  const handleListTypeChange = (type: NoteType | undefined) =>
    formState.active !== type && setFormState(getDefaultState(type))

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
            value={formState.Content}
            onChange={(e) => {
              setFormState({
                ...formState,
                Content: e.target.value,
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
              {(formState.Content as string[]).map((value, index) => (
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
                      index === (formState.Content as string[]).length - 1
                    }
                  />
                  {(formState.Content as string[]).length > 1 && (
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
      onClick={() =>
        formState.active === undefined && handleListTypeChange(NoteType.Note)
      }
      ref={wrapperRef}
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
              value={formState.Title}
              onChange={(e) =>
                setFormState({ ...formState, Title: e.target.value })
              }
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
                onClick={() => {
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
