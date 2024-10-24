import React, { useState } from 'react'

import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';
import { client } from '../../client';

import './Footer.scss'

const Footer = () => {

  const [formData, setFormData] = useState({name: '',email: '',message: ''});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, email, message} = formData;

  const handleChangeInput = (e) =>{
    const{ name, value} = e.target;

    setFormData({ ...formData, [name]: value});
  }

  const handleSubmit = () =>{
    setLoading(true);

    const contact = {
      _type: 'contact',
      name: formData.name,
      email: email,
      message: message
    }

    client.create(contact)
      .then(() => {
        setLoading(false);
        setIsFormSubmitted(true);
      })
  }


  return (
    <>
      <h2 className='head-text'>Take a coffe & Chat with me</h2>

      <div className='app__footer-cards'>
        <div className='app__footer-card'>
          <img src={images.email} alt="email" />
          <a href='mailto:jbagvanji54@gmail.com' className='p-text'>jbagvanji54@gmail.com</a>
        </div>

        <div className='app__footer-card'>
          <img src={images.mobile} alt="mobile" />
          <a href='tel:+258 877893230' className='p-text'>+258 877893230</a>
        </div>
      </div>

    {!isFormSubmitted ?
        <div className='app__footer-form app__flex'>
          <div className='app__flex'>
            <input className='p-text' type="text" placeholder="Teu Nome" name ="name" value={name} onChange={handleChangeInput} />
          </div>

          <div className='app__flex'>
            <input className='p-text' type="email" placeholder="Teu Email" name ="email" value={email} onChange={handleChangeInput} />
          </div>

          <div className=''>
            <textarea
              className='p-text' 
              placeholder='Tua Mensagem' 
              value={message}
              name="message"
              onChange={handleChangeInput}
            />
          </div>

          <button type='button' className='p-text' onClick={handleSubmit}>{loading ? 'sending' : 'Enviar Mensagem'}</button>
        </div>
      : <div>
          <h3 className='head-text'>Obrigado por entrar em contacto!</h3>
        </div>
    }

    </>
  )
}

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__whitebg'
)