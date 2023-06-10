import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import PlaneIcon from './Icons/PlaneIcon';
import MontainIcon from './Icons/MontainIcon';
import TimelineItem from './Timeline-item';
import { useContext, useEffect, useState } from "react";
import apiService from "../apiService";
import { useParams } from 'react-router-dom';
import { Context } from '../context/Context';


function TimelineList () {
  const { id } = useParams();
  const { dates, updateDates } = useContext(Context);
  const [travelCollections, setTravelCollections] = useState([]);


  async function getAllTravelCollections () {
    const travelCollections = await apiService.getTravelCollections();
    setTravelCollections(travelCollections);
  }
  useEffect(() => {
    getAllTravelCollections();

  }, [])

  function getTravelCollection () {
    return travelCollections.find((travel) => travel._id === id)
  }
  const travelCollection = getTravelCollection();

  const mockDates = ['9th June, 2023', '10th June, 2023', '11th June, 2023', '12th June, 2023', '13th June, 2023', '14th June, 2023', '15th June, 2023', '16th June, 2023', '17th June, 2023']
  // get dates here in here
  // where is dates? travel-info
  // how to pass? redux
  // pass the dates to the timeline-item using map

  // TODO: all the activities are showing to all the travelCollections, but in the database they are separated: FIX it in the client

  return (
    <div className="timeline-list">
      <h2>Timeline</h2>
      <h3>{travelCollection && travelCollection.travelName}</h3>
      {dates.map((date, idx) => {
        return (
          <VerticalTimeline
            lineColor="#091d36" key={idx}
          >
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              date={date}
              iconStyle={{ background: '#091d36', color: '#fff' }}
              icon={<PlaneIcon />}
            >
              <TimelineItem date={date} />
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              date={date}
              iconStyle={{ background: '#091d36', color: '#fff' }}
              icon={<MontainIcon />}
            >
              <TimelineItem date={date} />
            </VerticalTimelineElement>

          </VerticalTimeline>
        )
      })}
      {/*<VerticalTimeline
          lineColor="#091d36"
        >
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date={date}
            iconStyle={{ background: '#091d36', color: '#fff' }}
            icon={<PlaneIcon />}
          >
            <TimelineItem />
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date={date}
            iconStyle={{ background: '#091d36', color: '#fff' }}
            icon={<MontainIcon />}
          >
            <TimelineItem />
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date={date}
            iconStyle={{ background: '#091d36', color: '#fff' }}
            icon={<SuitcaseIcon />}
          >
            <TimelineItem />
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date={date}
            iconStyle={{ background: '#091d36', color: '#fff' }}
            icon={<PassportIcon />}
          >
            <TimelineItem />
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--education"
            date={date}
            iconStyle={{ background: '#091d36', color: '#fff' }}
            icon={<PlaneIcon />}
          >
            <TimelineItem />
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--education"
            date={date}
            iconStyle={{ background: '#091d36', color: '#fff' }}
            icon={<MontainIcon />}
          >
            <TimelineItem />
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--education"
            date={date}
            iconStyle={{ background: '#091d36', color: '#fff' }}
            icon={<SuitcaseIcon />}
          >
            <TimelineItem />
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--education"
            date={date}
            iconStyle={{ background: '#091d36', color: '#fff' }}
            icon={<PassportIcon />}
          >
            <TimelineItem />
          </VerticalTimelineElement>
      </VerticalTimeline>*/}



    </div>
  );
}

export default TimelineList;