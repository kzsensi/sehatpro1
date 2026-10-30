tailwind.config = {
  theme: {
    extend: {
      colors: {
        theme: 'var(--startGradient)',
        textColor:'var(--textColor)',
        black: '#344054',
        red: '#FF6666',
        active: '#00D555',
        lightbg: '#EBEBFE',
        gray: '#585874',
        lightgray: '#959496',
        bordergray: '#DEDEDE',
        inputbg: '#F8F8F8',
        copyright: '#BCADCF',
        login: '#E5E5E5',
        inputcolor: '#AAAFB7',
        inputcolor2: '#8B8BA7',
        radiobg: '#E6E7EB',
        dashicons: '#A8A8BD',
        dashtext: '#585874',
        dashlabelbg: '#F0E4FF',
        comingsoon: '#E4D0FF',
        poptext: '#637381',
        white: '#ffffff',
        lightwhite: '#f2f2f2',
      },
      important: true,
      boxShadow: {
        'cxl': '0px 0px 60px 0px rgba(0, 0, 0, 0.12)',
      },
      backgroundImage: {
        'bluepixel': "url('https://zealthix.com/product/images/bg-1.jpg')",
        'signupBg': "url('https://zealthix.com/product/images/bg.svg')"
      },
      animation: {
        'spin': 'spin 20s linear infinite',
      }
    }
  }
}