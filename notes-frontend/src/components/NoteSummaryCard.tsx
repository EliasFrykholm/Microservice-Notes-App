import {
  CardContent,
  Card,
  Typography,
  CardHeader,
  IconButton,
  Theme,
  CardActionArea,
} from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { createStyles, makeStyles } from '@material-ui/styles'
import Note from '../Models/Note'

type NoteSummaryCardProps = {
  note: Note
  onClick: () => void
  onDelete: () => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxHeight: '300px',
      minWidth: '250px',
      maxWidth: '600px',
      overflow: 'hidden',
    },
    cardHeader: {
      overflow: 'hidden',
    },
    cardContent: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  }),
)

const NoteSummaryCard = ({ note, onClick, onDelete }: NoteSummaryCardProps) => {
  const classes = useStyles()
  return (
    <Card
      className={classes.card}
      style={{ background: note.color }}
      elevation={3}
    >
      <CardActionArea onClick={onClick}>
        <CardHeader
          classes={{ root: classes.cardHeader, content: classes.cardHeader }}
          action={
            <IconButton
              aria-label="settings"
              onClick={(e) => {
                e.stopPropagation()
                onDelete()
              }}
            >
              <Delete />
            </IconButton>
          }
          title={note.title}
          subheader={new Date(note.created).toLocaleString()}
          subheaderTypographyProps={{ variant: 'caption' }}
          titleTypographyProps={{ variant: 'subtitle1', noWrap: true }}
        />
        <CardContent className={classes.cardContent}>
          <Typography className={classes.cardContent} variant="body2">
            {note.content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default NoteSummaryCard
