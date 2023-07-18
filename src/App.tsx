// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Button, ButtonOwnerState} from '../packages/components/Button'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <div className="container mx-auto px-4">
                <Button variant="text" active={true}>Text</Button>
                <p>&nbsp;</p>
                <Button variant="outlined">Outlined</Button>
                <p>&nbsp;</p>
                <Button variant="contained">Contained</Button>
                <p>&nbsp;</p>
                <Button variant="contained" disabled>Disabled</Button>
                <p>&nbsp;</p>
                <Button
                    variant="contained"
                    href="#"
                    slotProps={{
                        root: (state: ButtonOwnerState) => ({
                            className: `px-8 text-emerald-500 hover:text-cyan-100 ${
                                state.active ? 'bg-cyan-500' : 'bg-cyan-100'
                            }`,
                        }),
                    }}
                >Custom</Button>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
