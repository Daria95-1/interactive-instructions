import { useState } from 'react'
import styles from './app.module.css'
import data from './data.json'

export const App = () => {
	const [steps] = useState(data)
	const [activeIndex, setActiveIndex] = useState(0)

	const handleNextStep = () => {
		setActiveIndex((prevState) => prevState + 1)
	}

	const handleBackStep = () => {
		if (activeIndex > 0) {
			setActiveIndex((prevState) => prevState - 1)
		}
	}

	const handleReset = () => {
		setActiveIndex(0)
	}

	const isLastStep = activeIndex === steps.length - 1 ? true : false
	const isFirstStep = activeIndex === 0 ? true : false

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{steps[activeIndex].content}
					</div>
					<ul className={styles['steps-list']}>
						{steps.map(({ title, id }, index) => (
							<li
								key={id}
								className={
									styles['steps-item'] +
									(index === activeIndex
										? ` ${styles.active}`
										: '') +
									(index < activeIndex
										? ` ${styles.done}`
										: '')
								}
							>
								<button
									className={styles['steps-item-button']}
									onClick={() => setActiveIndex(index)}
								>
									{index + 1}
								</button>
								{title}
							</li>
						))}
					</ul>
					<div className={styles['buttons-container']}>
						<button
							className={styles.button}
							onClick={handleBackStep}
							disabled={isFirstStep}
						>
							Назад
						</button>
						<button
							className={styles.button}
							onClick={() =>
								isLastStep ? handleReset() : handleNextStep()
							}
						>
							{isLastStep ? 'Начать сначала' : 'Далее'}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
