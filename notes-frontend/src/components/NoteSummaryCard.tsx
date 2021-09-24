import {
  CardContent,
  Card,
  Typography,
  CardHeader,
  IconButton,
  Theme,
  CardActionArea,
} from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'
import { createStyles, makeStyles } from '@material-ui/styles'
import Note from '../Models/Note'

type NoteSummaryCardProps = {
  note: Note
  onClick: () => void
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

const NoteSummaryCard = ({ note, onClick }: NoteSummaryCardProps) => {
  const classes = useStyles()
  return (
    <Card
      className={classes.card}
      style={{ background: note.Color }}
      elevation={3}
    >
      <CardActionArea onClick={onClick}>
        <CardHeader
          classes={{ root: classes.cardHeader, content: classes.cardHeader }}
          action={
            <IconButton aria-label="settings">
              <MoreVert />
            </IconButton>
          }
          title={note.Title}
          subheader={note.Created.toLocaleString()}
          subheaderTypographyProps={{ variant: 'caption' }}
          titleTypographyProps={{ variant: 'subtitle1', noWrap: true }}
        />
        <CardContent className={classes.cardContent}>
          <Typography className={classes.cardContent} variant="body2">
            {note.Content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default NoteSummaryCard
