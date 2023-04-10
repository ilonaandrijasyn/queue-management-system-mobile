import React from 'react'
import Typography from '../Typography'
import GenerateTicketButton from '../GenerateTicketButton'
import { styles } from './styles'

interface NoTicketContentProps {
  ticketsNum: number
  serviceId: string
}

export default function NoTicketContent({ ticketsNum, serviceId }: NoTicketContentProps) {
  return (
    <>
      <Typography variant="h2" otherStyles={styles.text}>
        {'Počet čekajících:'}
      </Typography>
      <Typography variant="h2" otherStyles={styles.ticketsNumber}>
        {ticketsNum}
      </Typography>
      <GenerateTicketButton serviceId={serviceId} />
    </>
  )
}
