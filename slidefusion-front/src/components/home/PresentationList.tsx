import { Card, Typography } from "@mui/material"

type Props = {
    presentations: Presentation[]
}

export default function PresentationList({presentations}: Props) {
  return (
    presentations.map((presentation) => {
        return (
          <Card
            key={presentation.id}
            sx={{ marginTop: 2, padding: 2}}
          >
            <Typography>
              {presentation.title}
            </Typography>
          </Card>
        )
      })
  )
}