
import { RomanticReason, ComfortMessage, TimeCapsule, AudioScript } from '../types';

export const RANDOM_PHRASES = [
  "Você é o meu 'estou em casa' em qualquer lugar do mundo.",
  "Gosto de como o mundo faz silêncio quando você sorri.",
  "A melhor parte do meu dia é quando eu lembro que você existe.",
  "Você não é apenas o meu amor, é o meu lugar favorito no universo.",
  "Meu coração te escolheu e ele tem um gosto excelente.",
  "Obrigado por ser a minha calma no meio do caos.",
  "Eu amo quem eu sou quando estou com você.",
  "Cada detalhe seu é um verso que eu quero decorar.",
];

export const NIGHT_PHRASES = [
  "A noite fica mais bonita porque sei que amanhã te verei de novo.",
  "No silêncio da madrugada, é o seu nome que meu coração sussurra.",
  "Dormir é só um intervalo pra gente se encontrar nos sonhos.",
  "Você é a lua que ilumina meus pensamentos mais profundos.",
];

export const REASONS: RomanticReason[] = [
  {
    id: 1,
    text: "Pela forma como seus olhos sorriem antes mesmo da sua boca se mexer.",
    imagePrompt: "Pixar style, close-up of a girl's eyes with a sparkle of joy, soft golden hour lighting, expressive and warm."
  },
  {
    id: 7,
    text: "Pelo som da sua voz quando você acaba de acordar, é a música mais doce.",
    imagePrompt: "Anime style, soft morning light filtering through curtains, a cozy bed setting, peaceful and intimate atmosphere."
  },
  {
    id: 23,
    text: "Pelo jeito que você me ouve, como se nada mais no mundo importasse além das minhas palavras.",
    imagePrompt: "Digital illustration, soft focus, two people leaning towards each other, glowing particles like stars, deep connection."
  },
  {
    id: 37,
    text: "Pela sua mania de me fazer querer ser uma pessoa melhor todos os dias.",
    imagePrompt: "Delicate watercolor style, a sprout growing in the sun, symbolizing growth and love, soft pastel colors."
  },
  {
    id: 42,
    text: "Porque nossa conexão parece ter sido escrita nas estrelas muito antes de nascermos.",
    imagePrompt: "Cosmic romantic illustration, two silhouettes against a nebula, glowing thread connecting hearts, deep purple and blue tones."
  }
];

export const COMFORT_MESSAGES: ComfortMessage[] = [
  { id: 1, intensity: 'calm', message: "Respira fundo. Eu estou aqui agora. Mesmo que não fisicamente, meu coração está segurando a sua mão. Vai ficar tudo bem." },
  { id: 2, intensity: 'safe', message: "Você é mais forte do que imagina, mas não precisa ser forte o tempo todo. Pode descansar em mim agora." },
  { id: 3, intensity: 'deep', message: "Eu te escolhi para todos os momentos, inclusive os difíceis. Não vou a lugar nenhum. Fecha os olhos e sente o meu abraço." },
  { id: 4, intensity: 'calm', message: "Tudo passa, meu amor. O que a gente sente um pelo outro é o que fica. Toma o tempo que você precisar." }
];

export const TIME_CAPSULES: TimeCapsule[] = [
  {
    id: 1,
    date: '2025-06-12',
    title: 'Dia dos Namorados',
    content: "Neste dia, quero que você saiba que meu maior presente é o seu 'sim' diário. Que a nossa história continue sendo escrita com a mesma paixão do primeiro beijo.",
    isLocked: true
  },
  {
    id: 2,
    date: '2025-12-31',
    title: 'Nossa Virada',
    content: "Mais um ano ao seu lado. Se eu pudesse parar o tempo, pararia no momento exato em que você me olha e sorri sem motivo.",
    isLocked: true
  }
];

export const AUDIO_SCRIPTS: AudioScript[] = [
  {
    id: 1,
    title: "Para as manhãs calmas",
    script: "Bom dia, meu amor... Só queria que você soubesse, logo cedo, que você é o primeiro pensamento positivo do meu dia. Tenha um dia lindo, eu te amo."
  },
  {
    id: 2,
    title: "Para noites de saudade",
    script: "A distância agora é só um detalhe. Fecha os olhos, imagina meu rosto e lembra que meu coração bate no ritmo do seu. Boa noite, vida."
  }
];
