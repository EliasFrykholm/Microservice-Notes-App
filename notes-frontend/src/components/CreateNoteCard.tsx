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
import { ListNoteContent } from '../Models/NoteDescription'
import NoteType from '../Models/NoteType'
import NoteInput from './inputs/NoteInput'

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
  Content?: string | ListNoteContent[]
  Color?: string
  active?: NoteType
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

const getDefaultContent = (type: NoteType): string | ListNoteContent[] => {
  switch (type) {
    case NoteType.List:
      return [{}]
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

  const handleListTypeChange = (type: NoteType | undefined) =>
    formState.active !== type && setFormState(getDefaultState(type))

  return (
    <ClickAwayListener onClickAway={handleSubmit}>
      <Card
        className={classes.CreateNoteCard}
        elevation={3}
        onClick={() =>
          formState.active === undefined && handleListTypeChange(NoteType.Note)
        }
        ref={wrapperRef}
        style={{ background: formState.Color }}
      >
        {formState.active !== undefined &&
        formState.Content !== undefined &&
        formState.Title !== undefined ? (
          <NoteInput
            note={{ Content: formState.Content, Title: formState.Title }}
            onChange={(note) => setFormState({ ...formState, ...note })}
            onAbort={() => handleListTypeChange(undefined)}
            type={formState.active}
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
