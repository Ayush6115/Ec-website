import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/FeaturedSectionCards.css';

const FeaturedSectionCards = () => {
    const navigate = useNavigate();

    const cards = [
        {
            id: 'men',
            title: 'Men',
            image: 'https://images.unsplash.com/photo-1743877428895-fd3aabd06528?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWVuJTIwc2hvcHBpbmd8ZW58MHwwfDB8fHww',
            link: '/men',
        },
        {
            id: 'women',
            title: 'Women',
            image: 'https://images.unsplash.com/photo-1483181957632-8bda974cbc91?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29tZW4lMjBzaG9wcGluZ3xlbnwwfDB8MHx8fDA%3D',
            link: '/women',
        },
    {
            id: 'kids',
            title: 'Kids',
            image: 'https://images.unsplash.com/photo-1560506840-ec148e82a604?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a2lkcyUyMHNob3BwaW5nfGVufDB8MHwwfHx8MA%3D%3D',
            link: '/kids',
        },
    ];

    return (
        <section className="featured-section-cards-container">
            <h1 className="featured-section-heading">Featured Section</h1>
            <div className="featured-section-cards">
                {cards.map(card => (
                    <div
                        className="featured-card"
                        key={card.id}
                        onClick={() => navigate(card.link)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') navigate(card.link);
                        }}
                    >
                        <img src={card.image} alt={card.title} />
                        <div className="card-overlay">
                            <h2>{card.title}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturedSectionCards;
