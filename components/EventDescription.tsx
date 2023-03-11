import React from 'react';
import useFitText from 'use-fit-text';

const EventDescription = ({ descHtml }: { descHtml: string }) => {
    const inItalics = false;
    return (
        <div style={{ height: '100%', width: '100%', fontStyle: (inItalics ? 'italic' : 'inherit') }} dangerouslySetInnerHTML={{ __html: descHtml }}>
        </div>
    )
}

export default EventDescription;