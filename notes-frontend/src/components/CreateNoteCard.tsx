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
} from '@material-ui/core'
import { CheckBox, Palette } from '@material-ui/icons'
import { useRef, useState } from 'react'
import NoteType from '../Models/NoteType'
import useOutsideClick from '../hooks/useOutsideClick'
import TextNoteInput from './inputs/TextNoteInput'
import ListNoteInput from './inputs/ListNoteInput'

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

  const handleListTypeChange = (type: NoteType | undefined) =>
    formState.active !== type && setFormState(getDefaultState(type))

  const renderContentInput = (): JSX.Element | undefined => {
    switch (formState.active) {
      case NoteType.Note:
        return (
          <TextNoteInput
            value={formState.Content as string}
            onChange={(content) =>
              setFormState({ ...formState, Content: content })
            }
            maxRows={15}
          />
        )
      case NoteType.List:
        return (
          <ListNoteInput
            items={formState.Content as string[]}
            onChange={(items) => setFormState({ ...formState, Content: items })}
            maxHeight="500px"
          />
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
