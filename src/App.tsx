import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import Item from './pages/Item'
import './App.css'

function App() {
	return (
		<>
			<Routes>
				<Route element={<Layout />}>
					<Route path="/valantis/" element={<Home />} />
					<Route path="/valantis/items" element={<Home />} />
					<Route path="/valantis/items/:id" element={<Item />} />
				</Route>
			</Routes>
		</>
	)
}

export default App
