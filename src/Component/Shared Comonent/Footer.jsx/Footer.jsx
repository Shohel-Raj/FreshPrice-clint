import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaGithubSquare,  } from 'react-icons/fa';
import Container from '../Container/Container';
import MainLogo from '../MainLogo/MainLogo';

const Footer = () => {
    return (
        <footer className="bg-base-200 text-gray-700 py-10 ">
            <Container>
                <div className="flex justify-between gap-3 md:flex-row flex-col pb-4">
                    <div>
                        
                        <div className='flex  items-center gap-1.5'>
                          <MainLogo />  
                          <p className='text-3xl font-bold flex md:hidden'>Fresh Price</p>
                        </div>
                        <p className="small italic">Stay Updated. Shop Smarter.</p>
                    </div>


                    {/* Contact Details */}
                    <div>
                        <h3 className="font-bold text-2xl mb-2">Contact Us</h3>
                        <p className="flex items-center gap-2">
                            <FaPhoneAlt /> +880 1963 687341
                        </p>
                        <p className="flex items-center gap-2">
                            <FaEnvelope /> shohel87.dev@gmail.com
                        </p>
                    </div>

                    {/* Terms & Conditions */}
                    <div>
                        <h3 className="font-bold text-2xl mb-2">Legal</h3>
                        <ul>
                            <li><a href="/terms" className="hover:text-[#FBD536]">Terms & Conditions</a></li>
                            <li><a href="/privacy" className="hover:text-[#FBD536]">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Social Media Links */}
                    <div>
                        <h3 className="font-bold text-2xl mb-2">Follow Us</h3>
                        <div className="flex gap-4  text-xl">
                            <a className='hover:text-amber-400 ' href="https://facebook.com/mohammedshohel.bd" target='_blank' ><FaFacebookF size={25} className='hover:scale-125' /> </a>
                            <a className='hover:text-amber-400 ' href="https://www.linkedin.com/in/mohammedshohel87" target='_blank' ><FaLinkedinIn size={25} className='hover:scale-125' /></a>
                            <a className='hover:text-amber-400 ' href="https://github.com/Shohel-Raj" target='_blank' ><FaGithubSquare size={25} className='hover:scale-125' /></a>

                        </div>
                    </div>
                </div>

                
            </Container>

            <hr className='border-t border-gray-300 my-2'/>
            <Container>
                <div className="text-center text-sm   pt-4 ">
                    &copy; {new Date().getFullYear()} Fresh Price. All rights reserved.
                </div>
            </Container>

        </footer>
    );
};

export default Footer;
