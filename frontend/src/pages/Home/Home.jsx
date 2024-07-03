import React from 'react';
import Banner from '../../components/Banner/Banner.jsx';
import Item from '../../components/Item/Item.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import iconChat from '../../assets/icon-chat.png';
import iconMoney from '../../assets/icon-money.png';
import iconSecurity from '../../assets/icon-security.png';
import "../Home/home.scss";

function Home () {
    const imageData = {
        "icon-chat.webp": iconChat,
        "icon-money.webp": iconMoney,
        "icon-security.webp": iconSecurity
    }

    const featuresItemData = [
        {
            "id": "1",
            "image": "icon-chat.webp",
            "descriptionImage": "Chat Icon",
            "title": "You are our #1 priority",
            "description": "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
        },
        {
            "id": "2",
            "image": "icon-money.webp",
            "descriptionImage": "Money Icon",
            "title": "More savings means higher rates",
            "description": "The more you save with us, the higher your interest rate will be!"
        },
        {
            "id": "3",
            "image": "icon-security.webp",
            "descriptionImage": "Security Icon",
            "title": "Security you can trust",
            "description": "We use top of the line encryption to make sure your data and money is always safe."
        }
    ];

    return (
        <div className='homepage'>
            <main>
                <Banner />
                <section className="features">
                    <h2 className='sr-only'>Features</h2>
                    {featuresItemData.map((data) => (
                        <Item 
                            key={data.id}
                            image={imageData[data.image]}
                            descriptionImage={data.descriptionImage}
                            title={data.title}
                            description={data.description}
                        />
                    ))}
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default Home