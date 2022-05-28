import React, { useEffect, useState } from 'react'
import FullCalendar, { DateSelectArg, EventClickArg } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import "./Calendar.Module.scss"
import { INITIAL_EVENTS, createEventId } from '../../utils/event-utils'
import { Dialog, DialogTitle } from '@mui/material'
import { RequirementsDialog } from '../RequirementsDialog/RequirementsDialog'
import { useAuthContext } from '../../utils/AuthContext'
import { useNavigate } from 'react-router'



export const Calendar: React.FC<{}> = () => {
    const [currentEvents, setCurrentEvents] = useState()
    const [weekendsVisible, setWeekendVisible] = useState()

    const { userDetails } = useAuthContext()
    const navigate= useNavigate()

    useEffect(()=>{
        if(!userDetails.isLogged){
            navigate('/')
        }
    },[])

    const [open, setOpen] = useState<boolean>(false)
    const handleDateSelect = (selectInfo: DateSelectArg) => {
        // call custom component
        setOpen(true)
        // let title = prompt('Please enter a new title for your event')
        let calendarApi = selectInfo.view.calendar

        calendarApi.unselect() // clear date selection

        // if (title) {
        //     calendarApi.addEvent({
        //         id: createEventId(),
        //         title,
        //         start: selectInfo.startStr,
        //         end: selectInfo.endStr,
        //         allDay: selectInfo.allDay
        //     })
        // }
    }

    const handleEventClick = (clickInfo: EventClickArg) => {
        if (true) {
            clickInfo.event.remove()
        }
    }

    const handleEvents = (events: any) => {
        //    setCurrentEvents(events)
    }

    return <>
        <div className='demo-app'>
            <div className='demo-app-main'>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                        left: 'prev today next',
                        center: 'title',
                        right: ''
                    }}
                    initialView='timeGridWeek'
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    weekends={weekendsVisible}
                    // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
                    select={handleDateSelect}
                    // eventContent={renderEventContent} // custom render function
                    eventClick={handleEventClick}
                    eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                /* you can update a remote database when these fire:
                eventAdd={function(){}}
                eventChange={function(){}}
                eventRemove={function(){}}
                */
                />
            </div>
        </div>
        <Dialog onClose={() => { setOpen(false) }} open={open} >
            <DialogTitle sx={{ backgroundColor: "#3788d8", color: 'white' }}>Book a meeting room</DialogTitle>
            <RequirementsDialog />
        </Dialog>
    </>
}
// function renderEventContent(eventContent: EventContentArg) {
//     return (
//         <>
//             <b>{eventContent.timeText}</b>
//             <i>{eventContent.event.title}</i>
//         </>
//     )
// }
