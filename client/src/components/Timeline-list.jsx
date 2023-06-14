import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import PlaneIcon from './Icons/PlaneIcon';
import MontainIcon from './Icons/MontainIcon';
import TimelineItem from './Timeline-item';
import { useContext, useEffect } from "react";
import apiService from "../apiService";
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../context/Context';
import { firstLetterUpperCase, scrollToTop } from "../utils/helper";


function TimelineList () {
  const { id } = useParams();
  const { updateTravelCollections, travelCollections } = useContext(Context);
  const navigate = useNavigate();


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

  const travelCollectionArr = getTravelCollectionArr();
  const sortedtravelCollectionArr = travelCollectionArr.sort((a, b) => {
    const datesA = a.details.datesBetween;
    const datesB = b.details.datesBetween;
    const dateA = new Date(datesA[0].replace(/(st|nd|rd|th)/, ''));
    const dateB = new Date(datesB[0].replace(/(st|nd|rd|th)/, ''));
    return dateA - dateB;
  });

  return (
    <div className="timeline-list travel-collection-container">
      <h2>{travelCollectionArr.length && firstLetterUpperCase(travelCollectionArr[0].travelName)}</h2>
      <h3 className='go-back' onClick={() => navigate('/travel-collections')}>
        <span>&larr;</span> Go back to Trip Collections</h3>
      {sortedtravelCollectionArr.map((travelCollection, idx) => {
        const datesBetween = travelCollection.details.datesBetween;
        return (
          <VerticalTimeline lineColor="#edae00" key={idx}>
            {datesBetween.map((date, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <VerticalTimelineElement
                  key={idx}
                  contentStyle={{ background: 'var(--secondary)', border: '2px solid var(--primary-half-opacity)', 'boxShadow': '0px 15px 10px -15px var(--primary)' }}
                  contentArrowStyle={{ display: 'none' }}
                  className="vertical-timeline-element--work"
                  date={date}
                  iconStyle={{ background: '#edae00', color: '#fff' }}
                  icon={isEven ? <PlaneIcon /> : <MontainIcon />}
                >
                  <TimelineItem date={date} travelCol={travelCollection} />
                </VerticalTimelineElement>
              );
            })}
          </VerticalTimeline>
        )
      })}
      <h3 className='go-up' onClick={() => scrollToTop()}>
        <span>&uarr;</span> Go back to the top</h3>
    </div>
  );
}

export default TimelineList;