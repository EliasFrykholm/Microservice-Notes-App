import { TextField, makeStyles, createStyles, Theme } from '@material-ui/core'

type TextNoteContentInputProps = {
  value: string
  onChange: (value: string) => void
  maxRows: number | undefined
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ContentInput: theme.typography.body1,
  }),
)

const TextNoteContentInput = ({
  value,
  onChange,
  maxRows,
}: TextNoteContentInputProps) => {
  const classes = useStyles()

  return (
    <TextField
      inputProps={{
        className: classes.ContentInput,
      }}
      maxRows={maxRows}
      variant="outlined"
      multiline
      label="Create note ..."
      value={value}
      onChange={(e) => {
        onChange(e.target.value)
      }}
      autoFocus
      fullWidth
    />
  )
}

export default TextNoteContentInput
