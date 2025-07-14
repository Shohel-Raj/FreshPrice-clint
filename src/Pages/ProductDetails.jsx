import React from 'react';
import Container from '../Component/Shared Comonent/Container/Container';
import SeparateSection from '../Component/Shared Comonent/Seperate section/Seperatesection';
import ProductDetailsCard from '../Component/Shared Comonent/ProductCard/ProductDetailsCard';
import { useParams } from 'react-router';

const ProductDetails = () => {
    //   const { id } = useParams(); 
    //   console.log(id);


    return (
        <>

            <SeparateSection color='bg-base-200'>
                <Container>

                    <div className=' py-3.5'>
                        <h1 className="font-bold text-2xl md:text-3xl uppercase italic mb-3 text-center">
                            Browse Fresh Products from Local Markets
                        </h1>
                        <p className="md:w-3/4 mx-auto mb-3 text-center text-sm text-gray-600">
                            Explore a wide range of daily essentials including fruits, vegetables, and market staples. Updated regularly by verified vendors near you—FreshPrice helps you make smart, informed shopping decisions every day.
                        </p>

                    </div>
                </Container>
            </SeparateSection>
            <SeparateSection color='bg-[#F9EDE1]'>
                <Container>

                    <ProductDetailsCard ></ProductDetailsCard>
                </Container>
            </SeparateSection>





        </>
    );
};

export default ProductDetails;