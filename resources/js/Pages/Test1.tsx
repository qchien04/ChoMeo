import HomeLayout from '@/Layouts/HomeLayout';  
import { Button, Carousel } from 'antd';
import "./Test.css"
import Slide from '@/Components/Slide';
import { PageProps } from '@/types';
import { Link } from '@inertiajs/react';

export interface Dog {
    id: number;
    name: string;
    gender: string;
    age: string;
    weight: string;
    color: string;
    price: string;
    description: string;
    image: string;
    sterilized: string;
    vaccinated: string;
    is_active?: boolean;
}

export interface Cat {
    id: number;
    name: string;
    gender: string;
    age: string;
    weight: string;
    color: string;
    price: string;
    description: string;
    image: string;
    sterilized: string;
    vaccinated: string;
    is_active?: boolean;
}

export default function Test1({ dogs, cats, cages, accessories }: PageProps<{ dogs: Dog[], cats: Cat[], cages: [], accessories: [] }>) {

    return (
        <>
            <HomeLayout>

                {/* Carousel */}
                <Carousel autoplay dotPosition="top" dots={true} effect="fade">
                    <div className="slider-item">1</div>
                    <div className="slider-item">2</div>
                    <div className="slider-item">3</div>
                    <div className="slider-item">4</div>
                </Carousel>

                <div className='category-arena'>

                    <div className='category-arena_item'>
                        <div className="category-header">
                            <div className="category-title">Chó</div>
                            <Link href={`/cho`} className="category-button">
                                Xem tất cả
                            </Link>
                        </div>
                        <Slide items={dogs} typeItem='dog'></Slide>
                    </div>

                    <div className='category-arena_item'>
                        <div className="category-header">
                            <div className="category-title">Mèo</div>
                            <Link href={`/meo`} className="category-button">
                                Xem tất cả
                            </Link>
                        </div>
                        <Slide items={cats} typeItem='cat'></Slide>
                    </div>

                    <div className='category-arena_item'>
                        <div className="category-header">
                            <div className="category-title">Phụ kiện</div>
                            <Link href={`/phu-kien`} className="category-button">
                                Xem tất cả
                            </Link>
                        </div>
                        <Slide items={accessories} typeItem='accessory'></Slide>
                    </div>

                    <div className='category-arena_item'>
                        <div className="category-header">
                            <div className="category-title">Lồng, chuồng</div>
                            <Link href={`/long`} className="category-button">
                                Xem tất cả
                            </Link>
                        </div>
                        <Slide items={cages} typeItem='cage'></Slide>
                    </div>
                </div>

                {/* Banner */}
                <div>
                    <img style={{ width: "100%", borderRadius: "10px", margin: "20px 0" }} src='https://azpet.com.vn/wp-content/uploads/2021/05/banner1.png' alt="Banner" />
                </div>

                {/* Video */}
                <div className='video-arena'>
                    <iframe
                        width="914"
                        height="514"
                        src="https://www.youtube.com/embed/cyw3KBzn8Cw"
                        title="Hướng dẫn chăm sóc chó con"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                </div>

            </HomeLayout>
        </>
    );
}
