import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import PlaneIcon from './Icons/PlaneIcon';
import MontainIcon from './Icons/MontainIcon';
import SuitcaseIcon from './Icons/SuitcaseIcon';
import TimelineItem from './Timeline-item';
import { useContext, useEffect, useState } from "react";
import apiService from "../apiService";
import { useParams } from 'react-router-dom';
import { Context } from '../context/Context';
import { compareDates } from "../utils/helper";


function TimelineList () {
  const { id } = useParams();
  const { dates, updateDates } = useContext(Context);
  const { updateTravelCollections, travelCollections } = useContext(Context);


  async function getAllTravelCollections () {
    const travelCollections = await apiService.getTravelCollections();
    updateTravelCollections(travelCollections);
  }
  useEffect(() => {
    getAllTravelCollections();
  }, [])

  function getTravelCollectionArr () {
    const travelElement = travelCollections.find((travel) => travel._id === id);
    const travelNameElement = travelElement && travelElement.travelName;
    return travelCollections.filter((travel) => travel.travelName === travelNameElement);
  }



  // const travelCollectionArr = getTravelCollectionArr();

  const travelCollectionArr = getTravelCollectionArr();
  const sortedtravelCollectionArr = travelCollectionArr.sort((a, b) => {
    const datesA = a.details.datesBetween;
    const datesB = b.details.datesBetween;
    const dateA = new Date(datesA[0].replace(/(st|nd|rd|th)/, ''));
    const dateB = new Date(datesB[0].replace(/(st|nd|rd|th)/, ''));
    return dateA - dateB;
  });

  return (
    <div className="timeline-list container">
      <h2>Timeline</h2>
      <h3>{travelCollectionArr.length && travelCollectionArr[0].travelName}</h3>
      {sortedtravelCollectionArr.map((travelCollection, idx) => {
        const datesBetween = travelCollection.details.datesBetween;
        return (
          <VerticalTimeline lineColor="#091d36" key={idx}>
            {datesBetween.map((date, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <VerticalTimelineElement
                  key={idx}
                  className="vertical-timeline-element--work"
                  date={date}
                  iconStyle={{ background: '#091d36', color: '#fff' }}
                  icon={isEven ? <PlaneIcon /> : <MontainIcon />}
                >
                  <TimelineItem date={date} travelCol={travelCollection} />
                </VerticalTimelineElement>
              );
            })}
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