import {
  CardContent,
  Card,
  Typography,
  CardHeader,
  IconButton,
  Theme,
  CardActionArea,
  ListItemIcon,
  ListItemText,
  List,
  ListItem,
  Box,
  ClickAwayListener,
  Collapse,
} from '@material-ui/core'
import {
  Delete,
  CheckBox,
  CheckBoxOutlineBlankOutlined,
  ExpandMore,
  ExpandLess,
} from '@material-ui/icons'
import { createStyles, makeStyles } from '@material-ui/styles'
import { useState } from 'react'
import Note from '../Models/Note'
import NoteType from '../Models/NoteType'

type NoteSummaryCardProps = {
  note: Note
  onClick: () => void
  onDelete: () => void
  onListItemCheck: (index: number, value: boolean) => void
}

const MAX_LIST_ITEMS = 5

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      minWidth: '250px',
      maxWidth: '600px',
      overflow: 'hidden',
    },
    cardHeader: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    cardContent: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'pre',
    },
    cardAction: {
      marginTop: theme.spacing(1),
    },
    summaryList: {
      paddingBottom: 0,
      paddingTop: 0,
    },
    centerText: {
      textAlign: 'center',
    },
  }),
)

const NoteSummaryCard = ({
  note,
  onClick,
  onDelete,
  onListItemCheck,
}: NoteSummaryCardProps) => {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)
  return (
    <ClickAwayListener onClickAway={() => setExpanded(false)}>
      <Card
        className={classes.card}
        style={{ background: note.color }}
        elevation={3}
      >
        <CardActionArea onClick={onClick}>
          <CardHeader
            classes={{ root: classes.cardHeader, content: classes.cardContent }}
            action={
              <IconButton
                aria-label="settings"
                size="small"
                className={classes.cardAction}
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete()
                }}
              >
                <Delete />
              </IconButton>
            }
            title={note.title ? note.title : 'Untitled'}
            subheader={new Date(note.created).toLocaleString()}
            subheaderTypographyProps={{ variant: 'caption' }}
            titleTypographyProps={{ variant: 'subtitle1', noWrap: true }}
          />
          <CardContent className={classes.cardContent}>
            <Collapse timeout="auto" in={expanded}>
              {note.type === NoteType.List && note.listContent ? (
                <List dense className={classes.summaryList}>
                  {note.listContent
                    ?.slice(0, MAX_LIST_ITEMS)
                    .map((item, index) => (
                      <ListItem
                        dense
                        button
                        onClick={(e) => {
                          e.stopPropagation()
                          onListItemCheck(index, !item.checked)
                        }}
                      >
                        <ListItemIcon>
                          {item.checked ? (
                            <CheckBox color="secondary" />
                          ) : (
                            <CheckBoxOutlineBlankOutlined />
                          )}
                        </ListItemIcon>
                        <ListItemText>{item.name}</ListItemText>
                      </ListItem>
                    ))}
                </List>
              ) : (
                <Typography className={classes.cardContent} variant="body2">
                  {note.textContent}
                </Typography>
              )}
            </Collapse>
            <Box display="flex" justifyContent="center">
              <IconButton
                onClick={(e) => {
                  e.stopPropagation()
                  setExpanded(!expanded)
                }}
              >
                {expanded ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </ClickAwayListener>
  )
}

export default NoteSummaryCard
