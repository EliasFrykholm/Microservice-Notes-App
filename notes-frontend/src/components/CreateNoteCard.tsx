import {
  makeStyles,
  Theme,
  createStyles,
  ClickAwayListener,
  Card,
  Grid,
  Typography,
  IconButton,
} from '@material-ui/core'
import { CheckBox } from '@material-ui/icons'
import { useRef, useState } from 'react'
import NoteDescription, { ListNoteContent } from '../Models/NoteDescription'
import NoteType from '../Models/NoteType'
import NoteInput from './inputs/NoteInput'

type CreateNoteCardProps = {
  onSubmit: (note: NoteDescription) => void
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
  title?: string
  textContent?: string
  listContent?: ListNoteContent[]
  color?: string
  type?: NoteType
}

const isInputOk = (title?: string, content?: string | ListNoteContent[]) => {
  if (content && Array.isArray(content) && content.some((e) => e.name)) {
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

const getDefaultState = (type?: NoteType): FormState => {
  if (type !== undefined)
    return {
      title: '',
      textContent: '',
      listContent: [],
      type,
    }
  return {}
}

const CreateNoteCard = ({ onSubmit }: CreateNoteCardProps) => {
  const classes = useStyles()
  const [formState, setFormState] = useState<FormState>({})

  const wrapperRef = useRef(null)

  const handleSubmit = () => {
    if (
      isInputOk(formState.title, formState.listContent) ||
      isInputOk(formState.title, formState.textContent)
    ) {
      onSubmit(formState as NoteDescription)
    }
    setFormState(getDefaultState())
  }

  const handleListTypeChange = (type: NoteType | undefined) =>
    formState.type !== type && setFormState(getDefaultState(type))

  return (
    <ClickAwayListener onClickAway={handleSubmit}>
      <Card
        className={classes.CreateNoteCard}
        elevation={3}
        onClick={() =>
          formState.type === undefined && handleListTypeChange(NoteType.Note)
        }
        ref={wrapperRef}
        style={{ background: formState.color }}
      >
        {formState.type !== undefined && formState.title !== undefined ? (
          <NoteInput
            note={{
              listContent: formState.listContent,
              textContent: formState.textContent,
              title: formState.title,
              type: formState.type,
            }}
            onChange={(note) => setFormState({ ...formState, ...note })}
            onAbort={() => handleListTypeChange(undefined)}
            type={formState.type}
            maxListRows={15}
            maxNoteHeight="500px"
          />
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
    </ClickAwayListener>
  )
}

export default CreateNoteCard
