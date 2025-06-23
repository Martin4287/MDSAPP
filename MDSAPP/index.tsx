import React, { useState, useEffect, FormEvent } from 'react';
import ReactDOM from 'react-dom/client';

const App: React.FC = () => {
    const [fechaRegistro, setFechaRegistro] = useState<string>('');
    const [fechaReporte, setFechaReporte] = useState<string>(new Date().toISOString().split('T')[0]);
    const [ocupacionHotel, setOcupacionHotel] = useState<string>('');
    const [cantidadDesayunos, setCantidadDesayunos] = useState<string>('');
    const [mozosDesayuno, setMozosDesayuno] = useState<string>('');
    const [bacherosDesayuno, setBacherosDesayuno] = useState<string>('');
    const [cocinerosDesayuno, setCocinerosDesayuno] = useState<string>('');
    const [cubiertosAlmuerzo, setCubiertosAlmuerzo] = useState<string>('');
    const [mozosAlmuerzo, setMozosAlmuerzo] = useState<string>('');
    const [bacherosAlmuerzo, setBacherosAlmuerzo] = useState<string>('');
    const [cocinerosAlmuerzo, setCocinerosAlmuerzo] = useState<string>('');
    const [cubiertosCena, setCubiertosCena] = useState<string>('');
    const [mozosCena, setMozosCena] = useState<string>('');
    const [bacherosCena, setBacherosCena] = useState<string>('');
    const [cocinerosCena, setCocinerosCena] = useState<string>('');

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submitMessage, setSubmitMessage] = useState<string>('');

    useEffect(() => {
        setFechaRegistro(new Date().toLocaleString('es-ES', { dateStyle: 'medium', timeStyle: 'short' }));
    }, []);

    const resetForm = () => {
        setFechaReporte(new Date().toISOString().split('T')[0]);
        setOcupacionHotel('');
        setCantidadDesayunos('');
        setMozosDesayuno('');
        setBacherosDesayuno('');
        setCocinerosDesayuno('');
        setCubiertosAlmuerzo('');
        setMozosAlmuerzo('');
        setBacherosAlmuerzo('');
        setCocinerosAlmuerzo('');
        setCubiertosCena('');
        setMozosCena('');
        setBacherosCena('');
        setCocinerosCena('');
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage('');

        const dataToSubmit = {
            fechaRegistro,
            fechaReporte,
            ocupacionHotel: parseInt(ocupacionHotel) || 0,
            cantidadDesayunos: parseInt(cantidadDesayunos) || 0,
            mozosDesayuno: parseInt(mozosDesayuno) || 0,
            bacherosDesayuno: parseInt(bacherosDesayuno) || 0,
            cocinerosDesayuno: parseInt(cocinerosDesayuno) || 0,
            cubiertosAlmuerzo: parseInt(cubiertosAlmuerzo) || 0,
            mozosAlmuerzo: parseInt(mozosAlmuerzo) || 0,
            bacherosAlmuerzo: parseInt(bacherosAlmuerzo) || 0,
            cocinerosAlmuerzo: parseInt(cocinerosAlmuerzo) || 0,
            cubiertosCena: parseInt(cubiertosCena) || 0,
            mozosCena: parseInt(mozosCena) || 0,
            bacherosCena: parseInt(bacherosCena) || 0,
            cocinerosCena: parseInt(cocinerosCena) || 0,
        };

        // TODO: Replace 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL' with your actual Apps Script Web App URL
        const googleAppsScriptUrl = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';

        console.log("Data to submit:", dataToSubmit);
        
        if (googleAppsScriptUrl === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL') {
            setSubmitMessage('Configuración pendiente: Reemplace YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL en el código.');
            setIsSubmitting(false);
            // Simulate submission for UI testing without actual URL
            setTimeout(() => {
                console.log("Simulated submission successful with pending config.");
                // resetForm(); // uncomment if you want to reset form even with pending config
            }, 1000);
            return;
        }

        try {
            const response = await fetch(googleAppsScriptUrl, {
                method: 'POST',
                mode: 'cors', // Required for cross-origin requests to Apps Script
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSubmit),
                redirect: 'follow', // Apps Script web apps often redirect, 'follow' is important
            });
            
            // Apps Script web apps often return plain text or HTML for success, not always JSON.
            // For a doPost returning JSON as configured in example script:
            const result = await response.json(); 

            if (result.status === "success") {
                setSubmitMessage('Datos guardados exitosamente!');
                resetForm();
            } else {
                setSubmitMessage(`Error al guardar: ${result.message || 'Error desconocido del script.'}`);
            }
        } catch (error) {
            console.error('Error submitting data:', error);
            setSubmitMessage(`Error de conexión o configuración: ${error instanceof Error ? error.message : String(error)}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const styles: { [key: string]: React.CSSProperties } = {
        container: {
            backgroundColor: '#FFFFFF',
            padding: '30px 40px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            width: '100%',
            maxWidth: '700px',
            margin: '20px',
        },
        title: {
            textAlign: 'center',
            color: '#37352f',
            marginBottom: '30px',
            fontSize: '1.8em',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
        },
        fieldset: {
            border: '1px solid #ECECEC',
            borderRadius: '6px',
            padding: '20px',
            marginBottom: '10px',
        },
        legend: {
            padding: '0 10px',
            fontWeight: 'bold',
            color: '#37352f',
            fontSize: '1.1em',
        },
        label: {
            display: 'block',
            marginBottom: '8px',
            fontWeight: 500,
            fontSize: '0.95em',
            color: '#555555',
        },
        input: {
            width: 'calc(100% - 20px)',
            padding: '10px',
            border: '1px solid #DDDDDD',
            borderRadius: '4px',
            fontSize: '1em',
            backgroundColor: '#FFFFFF',
        },
        readOnlyInput: {
            width: 'calc(100% - 20px)',
            padding: '10px',
            border: '1px solid #DDDDDD',
            borderRadius: '4px',
            fontSize: '1em',
            backgroundColor: '#F7F7F7',
            color: '#555555',
        },
        button: {
            padding: '12px 20px',
            backgroundColor: '#007BFF', // A clear action blue
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1em',
            fontWeight: 'bold',
            transition: 'background-color 0.2s ease',
        },
        buttonDisabled: {
            backgroundColor: '#A0A0A0',
            cursor: 'not-allowed',
        },
        message: {
            textAlign: 'center',
            marginTop: '15px',
            padding: '10px',
            borderRadius: '4px',
            fontSize: '0.9em',
        },
        successMessage: {
            backgroundColor: '#D4EDDA',
            color: '#155724',
        },
        errorMessage: {
            backgroundColor: '#F8D7DA',
            color: '#721C24',
        }
    };

    const InputField: React.FC<{id: string, label: string, type: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, required?: boolean, readOnly?: boolean, min?: string}> = 
        ({id, label, type, value, onChange, required, readOnly, min}) => (
        <div>
            <label htmlFor={id} style={styles.label}>{label}{required && '*'}:</label>
            <input
                type={type}
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                required={required}
                readOnly={readOnly}
                min={min}
                style={readOnly ? styles.readOnlyInput : styles.input}
                aria-label={label}
            />
        </div>
    );

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Registro de Operaciones Diarias del Hotel</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <fieldset style={styles.fieldset}>
                    <legend style={styles.legend}>Información General</legend>
                    <InputField id="fechaRegistro" label="Fecha y Hora del Registro" type="text" value={fechaRegistro} onChange={() => {}} readOnly />
                    <InputField id="fechaReporte" label="Fecha del Reporte" type="date" value={fechaReporte} onChange={e => setFechaReporte(e.target.value)} required />
                    <InputField id="ocupacionHotel" label="# Ocupación del Hotel" type="number" value={ocupacionHotel} onChange={e => setOcupacionHotel(e.target.value)} required min="0" />
                </fieldset>

                <fieldset style={styles.fieldset}>
                    <legend style={styles.legend}>Desayuno</legend>
                    <InputField id="cantidadDesayunos" label="# Cantidad de Desayunos" type="number" value={cantidadDesayunos} onChange={e => setCantidadDesayunos(e.target.value)} required min="0" />
                    <InputField id="mozosDesayuno" label="Mozos Desayuno" type="number" value={mozosDesayuno} onChange={e => setMozosDesayuno(e.target.value)} required min="0" />
                    <InputField id="bacherosDesayuno" label="Bacheros Desayuno" type="number" value={bacherosDesayuno} onChange={e => setBacherosDesayuno(e.target.value)} required min="0" />
                    <InputField id="cocinerosDesayuno" label="Cocineros Desayuno" type="number" value={cocinerosDesayuno} onChange={e => setCocinerosDesayuno(e.target.value)} required min="0" />
                </fieldset>

                <fieldset style={styles.fieldset}>
                    <legend style={styles.legend}>Almuerzo</legend>
                    <InputField id="cubiertosAlmuerzo" label="# Cubiertos Almuerzo" type="number" value={cubiertosAlmuerzo} onChange={e => setCubiertosAlmuerzo(e.target.value)} required min="0" />
                    <InputField id="mozosAlmuerzo" label="Mozos Almuerzo" type="number" value={mozosAlmuerzo} onChange={e => setMozosAlmuerzo(e.target.value)} required min="0" />
                    <InputField id="bacherosAlmuerzo" label="Bacheros Almuerzo" type="number" value={bacherosAlmuerzo} onChange={e => setBacherosAlmuerzo(e.target.value)} required min="0" />
                    <InputField id="cocinerosAlmuerzo" label="Cocineros Almuerzo" type="number" value={cocinerosAlmuerzo} onChange={e => setCocinerosAlmuerzo(e.target.value)} required min="0" />
                </fieldset>

                <fieldset style={styles.fieldset}>
                    <legend style={styles.legend}>Cena</legend>
                    <InputField id="cubiertosCena" label="# Cubiertos Cena" type="number" value={cubiertosCena} onChange={e => setCubiertosCena(e.target.value)} required min="0" />
                    <InputField id="mozosCena" label="Mozos Cena" type="number" value={mozosCena} onChange={e => setMozosCena(e.target.value)} required min="0" />
                    <InputField id="bacherosCena" label="Bacheros Cena" type="number" value={bacherosCena} onChange={e => setBacherosCena(e.target.value)} required min="0" />
                    <InputField id="cocinerosCena" label="Cocineros Cena" type="number" value={cocinerosCena} onChange={e => setCocinerosCena(e.target.value)} required min="0" />
                </fieldset>

                <button type="submit" disabled={isSubmitting} style={{...styles.button, ...(isSubmitting ? styles.buttonDisabled : {})}}>
                    {isSubmitting ? 'Guardando...' : 'Guardar Datos'}
                </button>

                {submitMessage && (
                    <p style={{
                        ...styles.message,
                        ...(submitMessage.includes('exitosamente') ? styles.successMessage : styles.errorMessage)
                    }}
                    role="alert"
                    >
                        {submitMessage}
                    </p>
                )}
            </form>
        </div>
    );
};

const container = document.getElementById('root');
if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} else {
    console.error("Root element not found");
}

