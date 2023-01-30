/* eslint-disable @typescript-eslint/unified-signatures */
import { useEffect } from 'react';

export function useEventListener<T extends AbstractWorker, K extends keyof AbstractWorkerEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: AbstractWorker, event: AbstractWorkerEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

// @ts-expect-error function overload is correct but typescript doesn't like it
export function useEventListener<T extends Animation, K extends keyof AnimationEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: Animation, event: AnimationEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends AudioBufferSourceNode,
  K extends keyof AudioScheduledSourceNodeEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: AudioBufferSourceNode, event: AudioScheduledSourceNodeEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends AudioContext, K extends keyof BaseAudioContextEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: AudioContext, event: BaseAudioContextEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends AudioScheduledSourceNode,
  K extends keyof AudioScheduledSourceNodeEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: AudioScheduledSourceNode, event: AudioScheduledSourceNodeEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends AudioWorkletNode,
  K extends keyof AudioWorkletNodeEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: AudioWorkletNode, event: AudioWorkletNodeEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends BaseAudioContext,
  K extends keyof BaseAudioContextEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: BaseAudioContext, event: BaseAudioContextEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends BroadcastChannel,
  K extends keyof BroadcastChannelEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: BroadcastChannel, event: BroadcastChannelEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends CSSAnimation, K extends keyof AnimationEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: CSSAnimation, event: AnimationEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends CSSTransition, K extends keyof AnimationEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: CSSTransition, event: AnimationEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends CanvasCaptureMediaStreamTrack,
  K extends keyof MediaStreamTrackEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: CanvasCaptureMediaStreamTrack, event: MediaStreamTrackEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends ConstantSourceNode,
  K extends keyof AudioScheduledSourceNodeEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: ConstantSourceNode, event: AudioScheduledSourceNodeEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends Document, K extends keyof DocumentEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: Document, event: DocumentEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends DocumentAndElementEventHandlers,
  K extends keyof DocumentAndElementEventHandlersEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (
    this: DocumentAndElementEventHandlers,
    event: DocumentAndElementEventHandlersEventMap[K],
  ) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends Element, K extends keyof ElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: Element, event: ElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends EventSource, K extends keyof EventSourceEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: EventSource, event: EventSourceEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends FileReader, K extends keyof FileReaderEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: FileReader, event: FileReaderEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends FontFaceSet, K extends keyof FontFaceSetEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: FontFaceSet, event: FontFaceSetEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends GlobalEventHandlers,
  K extends keyof GlobalEventHandlersEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: GlobalEventHandlers, event: GlobalEventHandlersEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLAnchorElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLAnchorElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLAreaElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLAreaElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends HTMLAudioElement,
  K extends keyof HTMLMediaElementEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLAudioElement, event: HTMLMediaElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLBRElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLBRElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLBaseElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLBaseElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends HTMLBodyElement,
  K extends keyof HTMLBodyElementEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLBodyElement, event: HTMLBodyElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLButtonElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLButtonElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLCanvasElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLCanvasElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLDListElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLDListElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLDataElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLDataElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends HTMLDataListElement,
  K extends keyof HTMLElementEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLDataListElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLDetailsElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLDetailsElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLDialogElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLDialogElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLDivElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLDivElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLEmbedElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLEmbedElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends HTMLFieldSetElement,
  K extends keyof HTMLElementEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLFieldSetElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLFormElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLFormElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLHRElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLHRElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLHeadElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLHeadElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLHeadingElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLHeadingElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLHtmlElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLHtmlElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLIFrameElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLIFrameElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLImageElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLImageElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLInputElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLInputElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLLIElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLLIElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLLabelElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLLabelElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLLegendElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLLegendElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLLinkElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLLinkElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLMapElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLMapElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends HTMLMediaElement,
  K extends keyof HTMLMediaElementEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLMediaElement, event: HTMLMediaElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLMenuElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLMenuElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLMetaElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLMetaElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLMeterElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLMeterElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLModElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLModElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLOListElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLOListElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLObjectElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLObjectElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends HTMLOptGroupElement,
  K extends keyof HTMLElementEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLOptGroupElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLOptionElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLOptionElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLOutputElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLOutputElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends HTMLParagraphElement,
  K extends keyof HTMLElementEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLParagraphElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLPictureElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLPictureElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLPreElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLPreElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends HTMLProgressElement,
  K extends keyof HTMLElementEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLProgressElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLQuoteElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLQuoteElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLScriptElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLScriptElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLSelectElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLSelectElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLSlotElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLSlotElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLSourceElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLSourceElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLSpanElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLSpanElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLStyleElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLStyleElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends HTMLTableCaptionElement,
  K extends keyof HTMLElementEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLTableCaptionElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends HTMLTableCellElement,
  K extends keyof HTMLElementEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLTableCellElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends HTMLTableColElement,
  K extends keyof HTMLElementEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLTableColElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLTableElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLTableElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends HTMLTableRowElement,
  K extends keyof HTMLElementEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLTableRowElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends HTMLTableSectionElement,
  K extends keyof HTMLElementEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLTableSectionElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends HTMLTemplateElement,
  K extends keyof HTMLElementEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLTemplateElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends HTMLTextAreaElement,
  K extends keyof HTMLElementEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLTextAreaElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLTimeElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLTimeElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLTitleElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLTitleElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLTrackElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLTrackElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLUListElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLUListElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends HTMLUnknownElement, K extends keyof HTMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLUnknownElement, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends HTMLVideoElement,
  K extends keyof HTMLVideoElementEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: HTMLVideoElement, event: HTMLVideoElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends IDBDatabase, K extends keyof IDBDatabaseEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: IDBDatabase, event: IDBDatabaseEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends IDBOpenDBRequest,
  K extends keyof IDBOpenDBRequestEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: IDBOpenDBRequest, event: IDBOpenDBRequestEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends IDBRequest, K extends keyof IDBRequestEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: IDBRequest<T>, event: IDBRequestEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends IDBTransaction, K extends keyof IDBTransactionEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: IDBTransaction, event: IDBTransactionEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends MathMLElement, K extends keyof MathMLElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: MathMLElement, event: MathMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends MediaDevices, K extends keyof MediaDevicesEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: MediaDevices, event: MediaDevicesEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends MediaKeySession,
  K extends keyof MediaKeySessionEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: MediaKeySession, event: MediaKeySessionEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends MediaQueryList, K extends keyof MediaQueryListEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: MediaQueryList, event: MediaQueryListEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends MediaRecorder, K extends keyof MediaRecorderEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: MediaRecorder, event: MediaRecorderEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends MediaSource, K extends keyof MediaSourceEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: MediaSource, event: MediaSourceEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends MediaStream, K extends keyof MediaStreamEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: MediaStream, event: MediaStreamEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends MediaStreamTrack,
  K extends keyof MediaStreamTrackEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: MediaStreamTrack, event: MediaStreamTrackEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends MessagePort, K extends keyof MessagePortEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: MessagePort, event: MessagePortEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends Notification, K extends keyof NotificationEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: Notification, event: NotificationEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends OfflineAudioContext,
  K extends keyof OfflineAudioContextEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: OfflineAudioContext, event: OfflineAudioContextEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends OffscreenCanvas,
  K extends keyof OffscreenCanvasEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: OffscreenCanvas, event: OffscreenCanvasEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends OscillatorNode,
  K extends keyof AudioScheduledSourceNodeEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: OscillatorNode, event: AudioScheduledSourceNodeEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends PaymentRequest, K extends keyof PaymentRequestEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: PaymentRequest, event: PaymentRequestEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends Performance, K extends keyof PerformanceEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: Performance, event: PerformanceEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends PermissionStatus,
  K extends keyof PermissionStatusEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: PermissionStatus, event: PermissionStatusEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends PictureInPictureWindow,
  K extends keyof PictureInPictureWindowEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: PictureInPictureWindow, event: PictureInPictureWindowEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends RTCDTMFSender, K extends keyof RTCDTMFSenderEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: RTCDTMFSender, event: RTCDTMFSenderEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends RTCDataChannel, K extends keyof RTCDataChannelEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: RTCDataChannel, event: RTCDataChannelEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends RTCDtlsTransport,
  K extends keyof RTCDtlsTransportEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: RTCDtlsTransport, event: RTCDtlsTransportEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends RTCIceTransport,
  K extends keyof RTCIceTransportEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: RTCIceTransport, event: RTCIceTransportEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends RTCPeerConnection,
  K extends keyof RTCPeerConnectionEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: RTCPeerConnection, event: RTCPeerConnectionEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends RTCSctpTransport,
  K extends keyof RTCSctpTransportEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: RTCSctpTransport, event: RTCSctpTransportEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends RemotePlayback, K extends keyof RemotePlaybackEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: RemotePlayback, event: RemotePlaybackEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGAElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGAElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGAnimateElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGAnimateElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends SVGAnimateMotionElement,
  K extends keyof SVGElementEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: SVGAnimateMotionElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends SVGAnimateTransformElement,
  K extends keyof SVGElementEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: SVGAnimateTransformElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGAnimationElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGAnimationElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGCircleElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGCircleElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGClipPathElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGClipPathElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends SVGComponentTransferFunctionElement,
  K extends keyof SVGElementEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: SVGComponentTransferFunctionElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGDefsElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGDefsElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGDescElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGDescElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGEllipseElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGEllipseElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGFEBlendElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGFEBlendElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends SVGFEColorMatrixElement,
  K extends keyof SVGElementEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: SVGFEColorMatrixElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends SVGFEComponentTransferElement,
  K extends keyof SVGElementEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: SVGFEComponentTransferElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends SVGFECompositeElement,
  K extends keyof SVGElementEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: SVGFECompositeElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends SVGFEConvolveMatrixElement,
  K extends keyof SVGElementEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: SVGFEConvolveMatrixElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends SVGFEDiffuseLightingElement,
  K extends keyof SVGElementEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: SVGFEDiffuseLightingElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends SVGFEDisplacementMapElement,
  K extends keyof SVGElementEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: SVGFEDisplacementMapElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends SVGFEDistantLightElement,
  K extends keyof SVGElementEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: SVGFEDistantLightElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends SVGFEDropShadowElement,
  K extends keyof SVGElementEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: SVGFEDropShadowElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGFEFloodElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGFEFloodElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGFEFuncAElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGFEFuncAElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGFEFuncBElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGFEFuncBElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGFEFuncGElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGFEFuncGElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGFEFuncRElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGFEFuncRElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends SVGFEGaussianBlurElement,
  K extends keyof SVGElementEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: SVGFEGaussianBlurElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGFEImageElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGFEImageElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGFEMergeElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGFEMergeElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends SVGFEMergeNodeElement,
  K extends keyof SVGElementEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: SVGFEMergeNodeElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends SVGFEMorphologyElement,
  K extends keyof SVGElementEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: SVGFEMorphologyElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGFEOffsetElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGFEOffsetElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends SVGFEPointLightElement,
  K extends keyof SVGElementEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: SVGFEPointLightElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends SVGFESpecularLightingElement,
  K extends keyof SVGElementEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: SVGFESpecularLightingElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends SVGFESpotLightElement,
  K extends keyof SVGElementEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: SVGFESpotLightElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGFETileElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGFETileElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends SVGFETurbulenceElement,
  K extends keyof SVGElementEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: SVGFETurbulenceElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGFilterElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGFilterElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends SVGForeignObjectElement,
  K extends keyof SVGElementEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: SVGForeignObjectElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGGElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGGElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGGeometryElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGGeometryElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGGradientElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGGradientElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGGraphicsElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGGraphicsElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGImageElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGImageElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGLineElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGLineElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends SVGLinearGradientElement,
  K extends keyof SVGElementEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: SVGLinearGradientElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGMPathElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGMPathElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGMarkerElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGMarkerElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGMaskElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGMaskElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGMetadataElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGMetadataElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGPathElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGPathElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGPatternElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGPatternElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGPolygonElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGPolygonElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGPolylineElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGPolylineElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends SVGRadialGradientElement,
  K extends keyof SVGElementEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: SVGRadialGradientElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGRectElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGRectElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGSVGElement, K extends keyof SVGSVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGSVGElement, event: SVGSVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGScriptElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGScriptElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGSetElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGSetElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGStopElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGStopElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGStyleElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGStyleElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGSwitchElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGSwitchElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGSymbolElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGSymbolElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGTSpanElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGTSpanElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends SVGTextContentElement,
  K extends keyof SVGElementEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: SVGTextContentElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGTextElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGTextElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGTextPathElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGTextPathElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends SVGTextPositioningElement,
  K extends keyof SVGElementEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: SVGTextPositioningElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGTitleElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGTitleElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGUseElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGUseElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SVGViewElement, K extends keyof SVGElementEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SVGViewElement, event: SVGElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends ScreenOrientation,
  K extends keyof ScreenOrientationEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: ScreenOrientation, event: ScreenOrientationEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends ScriptProcessorNode,
  K extends keyof ScriptProcessorNodeEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: ScriptProcessorNode, event: ScriptProcessorNodeEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends ServiceWorker, K extends keyof ServiceWorkerEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: ServiceWorker, event: ServiceWorkerEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends ServiceWorkerContainer,
  K extends keyof ServiceWorkerContainerEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: ServiceWorkerContainer, event: ServiceWorkerContainerEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends ServiceWorkerRegistration,
  K extends keyof ServiceWorkerRegistrationEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: ServiceWorkerRegistration, event: ServiceWorkerRegistrationEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends ShadowRoot, K extends keyof ShadowRootEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: ShadowRoot, event: ShadowRootEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SharedWorker, K extends keyof AbstractWorkerEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SharedWorker, event: AbstractWorkerEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends SourceBuffer, K extends keyof SourceBufferEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: SourceBuffer, event: SourceBufferEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends SourceBufferList,
  K extends keyof SourceBufferListEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: SourceBufferList, event: SourceBufferListEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends SpeechSynthesis,
  K extends keyof SpeechSynthesisEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: SpeechSynthesis, event: SpeechSynthesisEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends SpeechSynthesisUtterance,
  K extends keyof SpeechSynthesisUtteranceEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: SpeechSynthesisUtterance, event: SpeechSynthesisUtteranceEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends TextTrack, K extends keyof TextTrackEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: TextTrack, event: TextTrackEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends TextTrackCue, K extends keyof TextTrackCueEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: TextTrackCue, event: TextTrackCueEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends TextTrackList, K extends keyof TextTrackListEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: TextTrackList, event: TextTrackListEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends VTTCue, K extends keyof TextTrackCueEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: VTTCue, event: TextTrackCueEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends VisualViewport, K extends keyof VisualViewportEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: VisualViewport, event: VisualViewportEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends WebSocket, K extends keyof WebSocketEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: WebSocket, event: WebSocketEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends Window, K extends keyof WindowEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: Window, event: WindowEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends WindowEventHandlers,
  K extends keyof WindowEventHandlersEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: WindowEventHandlers, event: WindowEventHandlersEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends Worker, K extends keyof WorkerEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: Worker, event: WorkerEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends XMLDocument, K extends keyof DocumentEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: XMLDocument, event: DocumentEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends XMLHttpRequest, K extends keyof XMLHttpRequestEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: XMLHttpRequest, event: XMLHttpRequestEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends XMLHttpRequestEventTarget,
  K extends keyof XMLHttpRequestEventTargetEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: XMLHttpRequestEventTarget, event: XMLHttpRequestEventTargetEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<
  T extends XMLHttpRequestUpload,
  K extends keyof XMLHttpRequestEventTargetEventMap,
>(
  target: T | undefined,
  type: K,
  listener: (this: XMLHttpRequestUpload, event: XMLHttpRequestEventTargetEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void;

export function useEventListener<T extends Window, K extends keyof WindowEventMap>(
  target: T | undefined,
  type: K,
  listener: (this: Window, event: WindowEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
): void {
  useEffect(() => {
    target?.addEventListener(type, listener, options);
    return () => {
      target?.removeEventListener(type, listener, options);
    };
  }, [target, type, listener, options]);
}
