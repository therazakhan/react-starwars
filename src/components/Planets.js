import React, { useState } from 'react';
import { usePaginatedQuery } from 'react-query';

import Planet from './Planet';

const fetchPlanets = async (key, page) => {
    const res = await fetch(`https://swapi.dev/api/planets?page=${page}`);
    return res.json();
}

const Planets = () => {
    const [page, setPage] = useState(1);
    const { resolvedData, latestData, status } = usePaginatedQuery(['planets', page], fetchPlanets, {
        onSuccess: () => console.log('planets fetch - OK'),
        onError: () => console.log('Error fetching planets')
    });

    return (
        <div>
            <h2>Planets</h2>
            {status === 'loading' && (
                <div>Loading planets...</div>
            )}
            {status === 'error' && (
                <div>Error fetching planets</div>
            )}
            {status === 'success' && (
                <>
                    <button
                        onClick={() => setPage(old => Math.max(old - 1, 1))}
                    >Previous page</button>
                    <span>{page}</span>
                    <button
                        onClick={() => setPage(old => (!latestData || !latestData.next ? old : old + 1))}
                        disabled={!latestData || !latestData.next}
                    >Next page</button>
                    <div>
                        {resolvedData.results.map(planet => <Planet key={planet.name} planet={planet} />)}
                    </div>
                </>
            )}
        </div>
    );
}

export default Planets;