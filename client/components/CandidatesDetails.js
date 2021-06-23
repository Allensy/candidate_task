
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

export default function CandidatesDetails({ candidates }) {
    const calculateGaps = (currentWorkPlace, previousWorkPlace) => {
    
        if (currentWorkPlace && previousWorkPlace) {
            const currentStart = moment(currentWorkPlace.start_date);
            const previousEnd = moment(previousWorkPlace.end_date);
            const diffInDays = currentStart.diff(previousEnd, 'day');

            if (diffInDays > 0) {
                
                if (diffInDays < 31) {
                    return `Gap between jobs: ${currentStart.diff(previousEnd, 'day')} days`;
                } else if (diffInDays >= 31 && diffInDays < 365) {
                    return `Gap between jobs: ${currentStart.diff(previousEnd, 'month')} months`;
                } else {
                    return `Gap between jobs: ${currentStart.diff(previousEnd, 'year')} years`;
                }
            } else {
                return 'No gap';
            }
        }
    }

    const Experience = styled.div`
    margin: 10px auto;
    `;

    const WorkPlace = styled.span`
    font-weight: bold;
    color: yellow;
    `;
    return (
        <div>
            {candidates.length > 0 ?
                <div>
                    {candidates.map((candidate, index) =>
                        <div key={uuidv4()}>
                            <h1>Hello {candidate.contact_info.name.formatted_name}</h1>
                            {candidate.experience.length ? candidate.experience.map((workPlace, secondIndex) =>
                                <Experience key={uuidv4()}>
                                    <span>Worked as</span> <WorkPlace>{workPlace.title} </WorkPlace>
                                    <div>From {workPlace.start_date} to {workPlace.end_date}</div>
                                    <div>{calculateGaps(workPlace, candidate.experience[secondIndex + 1])}</div>
                                </Experience>
                            ) : <div>No experience </div>}
                        </div>

                    )}
                </div> :

                <div>No data to show</div>
            }
        </div>
    )
}
