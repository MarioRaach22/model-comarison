Model URL: https://storage.googleapis.com/download.tensorflow.org/models/tflite/task_library/digit_classifier/android/mnist_metadata.tflite
Model file: mnist.tflite (committed alongside index.html; 1.2 MB float32 MNIST model from TensorFlow official storage, input [1,28,28,3], output [1,10]).
Accelerator: wasm (single-threaded XNNpack WebAssembly, loaded without threads or JSPI). Works without SharedArrayBuffer / cross-origin isolation (COOP/COEP not required).
Deployment caveat: GitHub Pages serves static files fine, but Git LFS pointer files are not binary — do NOT commit the .tflite via LFS (this file is committed as raw binary, 1.2 MB). The CDN loads LiteRT.js ESM and Wasm files from jsdelivr; the model is fetched relative (`mnist.tflite`) so no CORS issues.
No build step, no backend, fully static.
