declare module "swing" {
	class SpringSystem {
		createSpring(tension: number, friction: number): Spring;
	}

	class Spring {}

	export enum Direction {
		LEFT,
		RIGHT,
		UP,
		DOWN,
		INVALID,
	}

	export function Stack(config: IConfig): IStack;
	export function Card(stack: IStack, targetElement: HTMLElement, prepend?: boolean): ICard;

	interface ICard {
		on: (event: SwingEvent, handler: SwingEventHandler) => void;
		throwIn: (coordinateX?: number, coordinateY?: number, direction?: Direction) => void;
		throwOut: (coordinateX?: number, coordinateY?: number, direction?: Direction) => void;
		destroy: () => void;
	}

	interface IStack {
		getConfig: () => IConfig;
		getSpringSystem: () => SpringSystem;
		on: (eventName: SwingEvent, handler: SwingEventHandler) => void;
		createCard: (element: HTMLElement, prepend?: boolean) => ICard;
		getCard: (element: HTMLElement) => ICard | null;
		destroyCard: (card: ICard) => void;
	}

	type SwingEvent = "throwout" | "throwoutend" | "throwoutdown" | "throwoutleft" | "throwoutright" | "throwoutup" | "throwin" | "throwinend" | "dragstart" | "dragmove" | "dragend" | "destroyCard";
	type SwingEventHandler = (e: ISwingEventParameters) => void;

	interface ISwingEventParameters {
		offset: number;
		target: HTMLElement;
		throwDirection: Direction;
		throwOutConfidence: number;
	}

	interface IConfig {
		isThrowOut?: (x: number, y: number, element: HTMLElement, confidence: number) => boolean;
		allowedDirections?: Direction[];
		throwOutConfidence?: (x: number, y: number, element: HTMLElement) => number;
		throwOutDistance?: (minThrowOutDistance: number, maxThrowOutDistance: number) => number;
		minThrowOutDistance?: number;
		maxThrowOutDistance?: number;
		rotation?: (x: number, y: number, element: HTMLElement, maxRotation: number) => number;
		maxRotation?: number;
		transform?: (element: HTMLElement, x: number, y: number, rotation: number) => void;
	}
}
