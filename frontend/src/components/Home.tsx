

const Home = () => {
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      textAlign: 'center',
    }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{
          fontSize: '3rem',
          marginBottom: '1rem',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        }}>
         Learning Management System
        </h1>
      </header>

      <section style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        maxWidth: '1000px',
        marginBottom: '3rem',
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          padding: '2rem',
          margin: '1rem',
          width: '250px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          transition: 'transform 0.3s ease',
        }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <h2 style={{ marginBottom: '1rem', color: '#a0c4ff' }}>Machine Learning</h2>
          <p style={{ lineHeight: '1.6' }}>Course on Machine Learning</p>
        </div>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          padding: '2rem',
          margin: '1rem',
          width: '250px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          transition: 'transform 0.3s ease',
        }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <h2 style={{ marginBottom: '1rem', color: '#a0c4ff' }}>HCI</h2>
          <p style={{ lineHeight: '1.6' }}>Course on Human Computer Interfacing</p>
        </div>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          padding: '2rem',
          margin: '1rem',
          width: '250px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          transition: 'transform 0.3s ease',
        }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <h2 style={{ marginBottom: '1rem', color: '#a0c4ff' }}>French</h2>
          <p style={{ lineHeight: '1.6' }}>Course on French</p>
        </div>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          padding: '2rem',
          margin: '1rem',
          width: '250px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          transition: 'transform 0.3s ease',
        }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <h2 style={{ marginBottom: '1rem', color: '#a0c4ff' }}>Notice</h2>
          <p style={{ lineHeight: '1.6' }}>IT Dept Notice board</p>
        </div>
      </section>

      <footer style={{ marginTop: '2rem' }}>
        <button style={{
          background: '#ffc107',
          color: '#333',
          padding: '1rem 2rem',
          border: 'none',
          borderRadius: '5px',
          fontSize: '1.1rem',
          cursor: 'pointer',
          transition: 'background 0.3s ease',
        }}
          onMouseOver={(e) => e.currentTarget.style.background = '#ffca2c'}
          onMouseOut={(e) => e.currentTarget.style.background = '#ffc107'}
        >
         Join Class
        </button>
      </footer>
    </div>
  );
};

export default Home;