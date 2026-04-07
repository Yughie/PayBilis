import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Language = 'fil' | 'en';

type Translation = {
  header: {
    subtitle: string;
    howItWorks: string;
    setupSubscription: string;
    summary: string;
    verifiedOnboarding: string;
    getStarted: string;
    openMenuLabel: string;
    switchTo: string;
  };
  hero: {
    badge: string;
    title: string;
    description: string;
    setupSubscription: string;
    exploreHowItWorks: string;
    verified: string;
    verifiedDescription: string;
    fast: string;
    fastDescription: string;
    secure: string;
    secureDescription: string;
    dashboardTitle: string;
    dashboardSubtitle: string;
    verifiedFlow: string;
    verifiedFlowDescription: string;
    flexibleSchedule: string;
    flexibleScheduleDescription: string;
    fastSetup: string;
    trustSignal: string;
    efficiency: string;
    stepFlow: string;
    verifiedAddress: string;
    perBillerDates: string;
  };
  howItWorks: {
    badge: string;
    title: string;
    description: string;
    cards: Array<{ title: string; description: string }>;
  };
  form: {
    eyebrow: string;
    title: string;
    allFieldsRequired: string;
    stepLabel: string;
    completeLabel: string;
    steps: Array<{ title: string }>;
    personal: {
      fullName: string;
      contactNumber: string;
      houseAddress: string;
      houseAddressHint: string;
      fullNameError: string;
      contactNumberError: string;
      houseAddressError: string;
      fullNamePlaceholder: string;
      contactNumberPlaceholder: string;
      houseAddressPlaceholder: string;
    };
    billers: {
      title: string;
      description: string;
      remove: string;
      billerName: string;
      billerNameHint: string;
      billerNamePlaceholder: string;
      billerNameError: string;
      accountNumber: string;
      accountNumberError: string;
      accountNumberPlaceholder: string;
      accountName: string;
      accountNameError: string;
      accountNamePlaceholder: string;
      estimatedAmount: string;
      estimatedAmountError: string;
      estimatedAmountPlaceholder: string;
      collectionDate: string;
      collectionDateHint: string;
      collectionDateError: string;
      collectionDatePlaceholder: string;
      collectionDateOptions: Array<{ value: string; label: string }>;
    };
    addBiller: string;
    frequency: string;
    frequencyOptions: Array<{ value: 'One-time' | 'Monthly Subscription'; label: string }>;
    review: {
      title: string;
      description: string;
      details: Array<string>;
    };
    pending: string;
    back: string;
    continue: string;
    submit: string;
    submittedTitle: string;
    submittedDescription: string;
    trustedControls: string;
    trustedControlItems: string[];
  };
  summary: {
    eyebrow: string;
    title: string;
    description: string;
    estimated: string;
    subscriber: string;
    address: string;
    billers: string;
    schedule: string;
    billerDetails: string;
    billerLabel: string;
    pendingBiller: string;
    pending: string;
    account: string;
    accountName: string;
    amount: string;
    collectionDate: string;
    billersCountUnit: string;
    serviceStatus: string;
    serviceStatusDescription: string;
  };
  footer: {
    copyright: string;
    tagline: string;
    creatorTitle: string;
    creatorDescription: string;
  };
};

const translations: Record<Language, Translation> = {
  fil: {
    header: {
      subtitle: 'Pagbayad ng bill na door-to-door',
      howItWorks: 'Paano ito gumagana',
      setupSubscription: 'I-setup ang subscription',
      summary: 'Buod',
      verifiedOnboarding: 'Nabe-verify na onboarding',
      getStarted: 'Magsimula',
      openMenuLabel: 'Buksan ang menu',
      switchTo: 'English',
    },
    hero: {
      badge: 'Maaasahang pag-setup ng bill',
      title: 'Door-to-door na pagbabayad ng bill na may propesyonal at mapagkakatiwalaang karanasan.',
      description: 'Pinapadali ng PayBilis ang pag-sign up ng serbisyo para sa mga tahanan at maliliit na negosyo gamit ang mabilis, beripikado, at madaling repasuhing proseso.',
      setupSubscription: 'I-setup ang subscription',
      exploreHowItWorks: 'Tingnan kung paano ito gumagana',
      verified: 'Beripikado',
      verifiedDescription: 'Onboarding ng address ng bahay',
      fast: 'Mabilis',
      fastDescription: 'Hakbang-hakbang na beripikasyon',
      secure: 'Ligtas',
      secureDescription: 'Propesyonal na review flow',
      dashboardTitle: 'Mas mahinahon at mas kapani-paniwalang view ng onboarding.',
      dashboardSubtitle: 'PayBilis dashboard',
      verifiedFlow: 'Beripikadong daloy',
      verifiedFlowDescription: 'Nasa iisang lugar ang detalye ng tahanan at mga biller.',
      flexibleSchedule: 'Flexible na iskedyul',
      flexibleScheduleDescription: 'Magkakaibang petsa ng koleksyon para sa bawat biller.',
      fastSetup: 'Mabilis na setup',
      trustSignal: 'Senyales ng tiwala',
      efficiency: 'Kahusayan',
      stepFlow: '3-hakbang na flow',
      verifiedAddress: 'Beripikadong address',
      perBillerDates: 'Petsa kada biller',
    },
    howItWorks: {
      badge: 'Paano ito gumagana',
      title: 'Idinisenyo para bawasan ang abala at dagdagan ang tiwala.',
      description: 'Nakaayos ang proseso sa malinaw na mga checkpoint ng onboarding para makapag-verify ng pagkakakilanlan, makapag-link ng account, at makapag-schedule ng koleksyon nang walang kalituhan.',
      cards: [
        { title: '1. Ibahagi ang mga detalye mo', description: 'Ilagay ang iyong pangalan, contact number, at beripikadong address ng bahay para masimulan ang subscription.' },
        { title: '2. Idagdag ang impormasyon ng bill', description: 'Ibigay ang pangalan ng biller, account number, at account name para sa tumpak na onboarding.' },
        { title: '3. Piliin ang iskedyul', description: 'Itakda ang gusto mong petsa ng koleksyon, tinatayang halaga, at dalas ng subscription.' },
      ],
    },
    form: {
      eyebrow: 'I-setup ang PayBilis subscription mo',
      title: 'Isang gabay na onboarding flow para sa pinagkakatiwalaang paulit-ulit na bayad.',
      allFieldsRequired: 'Kinakailangan ang lahat ng field',
      stepLabel: 'Hakbang',
      completeLabel: 'kumpleto',
      steps: [{ title: 'Personal' }, { title: 'Account' }, { title: 'Schedule' }, { title: 'Review' }],
      personal: {
        fullName: 'Buong Pangalan',
        contactNumber: 'Numero ng Contact',
        houseAddress: 'Beripikadong Address ng Bahay',
        houseAddressHint: 'Gamitin ang eksaktong address kung saan mangyayari ang koleksyon ng bill.',
        fullNameError: 'Kailangan ang buong pangalan',
        contactNumberError: 'Kailangan ang contact number',
        houseAddressError: 'Kailangan ang address ng bahay',
        fullNamePlaceholder: 'Juan Dela Cruz',
        contactNumberPlaceholder: '09xxxxxxxxx',
        houseAddressPlaceholder: 'Unit 5, 123 Main Street, Quezon City',
      },
      billers: {
        title: 'Billers',
        description: 'Magdagdag ng kuryente, tubig, internet, o anumang biller.',
        remove: 'Tanggalin',
        billerName: 'Pangalan ng Biller',
        billerNameHint: 'Halimbawa: Kuryente, Tubig, Internet.',
        billerNamePlaceholder: 'Kuryente',
        billerNameError: 'Kailangan ang pangalan ng biller',
        accountNumber: 'Account Number',
        accountNumberError: 'Kailangan ang account number',
        accountNumberPlaceholder: '1234567890',
        accountName: 'Pangalan sa Account',
        accountNameError: 'Kailangan ang pangalan sa account',
        accountNamePlaceholder: 'Juan Dela Cruz',
        estimatedAmount: 'Tinatayang Halaga',
        estimatedAmountError: 'Kailangan ang tinatayang halaga',
        estimatedAmountPlaceholder: '1500',
        collectionDate: 'Nais na Petsa ng Koleksyon',
        collectionDateHint: 'Piliin ang petsa ng koleksyon para sa biller na ito.',
        collectionDateError: 'Kailangan ang petsa ng koleksyon',
        collectionDatePlaceholder: 'Pumili ng petsa ng koleksyon',
        collectionDateOptions: [
          { value: 'Every 1st', label: 'Tuwing ika-1' },
          { value: 'Every 5th', label: 'Tuwing ika-5' },
          { value: 'Every 10th', label: 'Tuwing ika-10' },
          { value: 'Every 15th', label: 'Tuwing ika-15' },
          { value: 'Every 20th', label: 'Tuwing ika-20' },
          { value: 'Every 25th', label: 'Tuwing ika-25' },
          { value: 'Every 30th', label: 'Tuwing ika-30' },
        ],
      },
      addBiller: 'Magdagdag ng isa pang biller',
      frequency: 'Dalas',
      frequencyOptions: [
        { value: 'One-time', label: 'Isang beses' },
        { value: 'Monthly Subscription', label: 'Buwanang subscription' },
      ],
      review: { title: 'Repasuhin ang subscription mo', description: 'Na-validate na ang mga inilagay mo at handa nang isumite.', details: ['Buong Pangalan', 'Contact', 'Address', 'Billers', 'Dalas'] },
      pending: 'Naka-pending',
      back: 'Bumalik',
      continue: 'Magpatuloy',
      submit: 'Isumite ang Subscription',
      submittedTitle: 'Naipadala na ang subscription',
      submittedDescription: 'Natanggap na ng PayBilis ang mga detalye ng onboarding at maaari nang magpatuloy sa beripikasyon.',
      trustedControls: 'Mga pinagkakatiwalaang kontrol',
      trustedControlItems: ['Kinakailangan ang beripikadong address ng bahay bago ma-activate.', 'Na-optimize para sa mabilis na paulit-ulit na onboarding.', 'Ligtas at propesyonal na daloy ng koleksyon ng bill.'],
    },
    summary: {
      eyebrow: 'Silip ng subscription',
      title: 'PayBilis Buod',
      description: 'Malinaw na tingin sa subscription bago isumite.',
      estimated: 'Tinatayang',
      subscriber: 'Subscriber',
      address: 'Address ng bahay',
      billers: 'Mga biller',
      schedule: 'Iskedyul',
      billerDetails: 'Detalye ng biller',
      billerLabel: 'Biller',
      pendingBiller: 'Naka-pending na biller',
      pending: 'Naka-pending',
      account: 'Account',
      accountName: 'Pangalan sa account',
      amount: 'Halaga',
      collectionDate: 'Petsa ng koleksyon',
      billersCountUnit: 'serbisyo',
      serviceStatus: 'Katayuan ng serbisyo',
      serviceStatusDescription: 'Kukumpirmahin ng PayBilis team ang beripikadong address at mga iskedyul ng koleksyon kada biller.',
    },
    footer: {
      copyright: '© 2026 PayBilis. Maaasahang door-to-door na subscription sa pagbabayad ng bill.',
      tagline: 'Karanasang nakasentro sa tiwala gamit ang asul at luntiang tema para sa residential at business users.',
      creatorTitle: 'Ginawa ni Yughie Perez',
      creatorDescription: 'Si Yughie Perez ay isang Data and AI Engineer na nagsimula ng PayBilis para itulak ang inobasyon, makatulong laban sa tumataas na gastos sa gasolina, at gawing mas maginhawa ang pagbabayad ng bill para sa mga tao.',
    },
  },
  en: {
    header: {
      subtitle: 'Door-to-door bill payments',
      howItWorks: 'How it works',
      setupSubscription: 'Setup subscription',
      summary: 'Summary',
      verifiedOnboarding: 'Verified onboarding',
      getStarted: 'Get Started',
      openMenuLabel: 'Open menu',
      switchTo: 'Filipino',
    },
    hero: {
      badge: 'Reliable bill setup',
      title: 'Door-to-door bill payments with a professional and trustworthy experience.',
      description: 'PayBilis simplifies service enrollment for households and small businesses with a fast, verified, and easy-to-review flow.',
      setupSubscription: 'Setup Subscription',
      exploreHowItWorks: 'Explore How It Works',
      verified: 'Verified',
      verifiedDescription: 'Household address onboarding',
      fast: 'Fast',
      fastDescription: 'Step-by-step validation',
      secure: 'Secure',
      secureDescription: 'Professional review flow',
      dashboardTitle: 'A calmer, more credible onboarding view.',
      dashboardSubtitle: 'PayBilis dashboard',
      verifiedFlow: 'Verified flow',
      verifiedFlowDescription: 'Household details and billers collected in one place.',
      flexibleSchedule: 'Flexible schedule',
      flexibleScheduleDescription: 'Different collection dates per biller.',
      fastSetup: 'Fast setup',
      trustSignal: 'Trust signal',
      efficiency: 'Efficiency',
      stepFlow: '3-step flow',
      verifiedAddress: 'Verified address',
      perBillerDates: 'Per-biller dates',
    },
    howItWorks: {
      badge: 'How it works',
      title: 'Designed to reduce friction and increase trust.',
      description: 'The flow is structured around clear onboarding checkpoints so users can verify identity, connect an account, and schedule collections without confusion.',
      cards: [
        { title: '1. Share your details', description: 'Enter your name, contact number, and verified house address to start the subscription.' },
        { title: '2. Add bill information', description: 'Provide the biller name, account number, and account name for accurate onboarding.' },
        { title: '3. Pick the schedule', description: 'Set your preferred collection date, estimated amount, and subscription frequency.' },
      ],
    },
    form: {
      eyebrow: 'Setup your PayBilis Subscription',
      title: 'A guided onboarding flow for trusted recurring payments.',
      allFieldsRequired: 'All fields are required',
      stepLabel: 'Step',
      completeLabel: 'complete',
      steps: [{ title: 'Personal' }, { title: 'Account' }, { title: 'Schedule' }, { title: 'Review' }],
      personal: {
        fullName: 'Full Name',
        contactNumber: 'Contact Number',
        houseAddress: 'Verified House Address',
        houseAddressHint: 'Use the exact address where the bill collection will happen.',
        fullNameError: 'Full name is required',
        contactNumberError: 'Contact number is required',
        houseAddressError: 'House address is required',
        fullNamePlaceholder: 'Juan Dela Cruz',
        contactNumberPlaceholder: '09xxxxxxxxx',
        houseAddressPlaceholder: 'Unit 5, 123 Main Street, Quezon City',
      },
      billers: {
        title: 'Billers',
        description: 'Add electricity, water, internet, or any other biller.',
        remove: 'Remove',
        billerName: 'Biller Name',
        billerNameHint: 'Examples: Electric, Water, Internet.',
        billerNamePlaceholder: 'Electric',
        billerNameError: 'Biller name is required',
        accountNumber: 'Account Number',
        accountNumberError: 'Account number is required',
        accountNumberPlaceholder: '1234567890',
        accountName: 'Account Name',
        accountNameError: 'Account name is required',
        accountNamePlaceholder: 'Juan Dela Cruz',
        estimatedAmount: 'Estimated Amount',
        estimatedAmountError: 'Estimated amount is required',
        estimatedAmountPlaceholder: '1500',
        collectionDate: 'Preferred Collection Date',
        collectionDateHint: 'Choose the collection date for this biller.',
        collectionDateError: 'Collection date is required',
        collectionDatePlaceholder: 'Select a collection date',
        collectionDateOptions: [
          { value: 'Every 1st', label: 'Every 1st' },
          { value: 'Every 5th', label: 'Every 5th' },
          { value: 'Every 10th', label: 'Every 10th' },
          { value: 'Every 15th', label: 'Every 15th' },
          { value: 'Every 20th', label: 'Every 20th' },
          { value: 'Every 25th', label: 'Every 25th' },
          { value: 'Every 30th', label: 'Every 30th' },
        ],
      },
      addBiller: 'Add another biller',
      frequency: 'Frequency',
      frequencyOptions: [
        { value: 'One-time', label: 'One-time' },
        { value: 'Monthly Subscription', label: 'Monthly subscription' },
      ],
      review: { title: 'Review your subscription', description: 'Your input is validated and ready for submission.', details: ['Full Name', 'Contact', 'Address', 'Billers', 'Frequency'] },
      pending: 'Pending',
      back: 'Back',
      continue: 'Continue',
      submit: 'Submit Subscription',
      submittedTitle: 'Subscription submitted',
      submittedDescription: 'PayBilis has received the onboarding details and can proceed with verification.',
      trustedControls: 'Trusted controls',
      trustedControlItems: ['Verified household address required before activation.', 'Optimized for fast recurring onboarding.', 'Secure and professional bill collection flow.'],
    },
    summary: {
      eyebrow: 'Subscription preview',
      title: 'PayBilis Summary',
      description: 'A clean view of the subscription before submission.',
      estimated: 'Estimated',
      subscriber: 'Subscriber',
      address: 'Address',
      billers: 'Billers',
      schedule: 'Schedule',
      billerDetails: 'Biller details',
      billerLabel: 'Biller',
      pendingBiller: 'Pending biller',
      pending: 'Pending',
      account: 'Account',
      accountName: 'Account name',
      amount: 'Amount',
      collectionDate: 'Collection date',
      billersCountUnit: 'service',
      serviceStatus: 'Service status',
      serviceStatusDescription: 'Verified address and per-biller collection schedules will be confirmed by the PayBilis team.',
    },
    footer: {
      copyright: '© 2026 PayBilis. Reliable door-to-door bill payment subscriptions.',
      tagline: 'Deep blue and green trust-led experience for residential and business users.',
      creatorTitle: 'Created by Yughie Perez',
      creatorDescription: 'Yughie Perez is a Data and AI Engineer who started PayBilis to drive innovation, help counter rising fuel costs, and make bill payments more convenient for people.',
    },
  },
};

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: Translation;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') {
      return 'fil';
    }

    const storedLanguage = window.localStorage.getItem('paybilis-language');
    return storedLanguage === 'en' ? 'en' : 'fil';
  });

  useEffect(() => {
    window.localStorage.setItem('paybilis-language', language);
    document.documentElement.lang = language === 'fil' ? 'tl' : 'en';
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage,
    toggleLanguage: () => setLanguage((current) => (current === 'fil' ? 'en' : 'fil')),
    t: translations[language],
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
}

export function getFrequencyLabel(language: Language, value: string) {
  const labelMap = translations[language].form.frequencyOptions.find((option) => option.value === value);
  return labelMap?.label ?? value;
}
