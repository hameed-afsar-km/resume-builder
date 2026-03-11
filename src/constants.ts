import { TemplateConfig } from './types';

export const TEMPLATES: TemplateConfig[] = [
  // FAANG (Single Column, ATS Optimized)
  { id: 'f1', name: 'Google Standard', category: 'FAANG', layout: 'single', fontFamily: 'font-sans', primaryColor: '#1a73e8', secondaryColor: '#5f6368', headerAlignment: 'left', showImage: false },
  { id: 'f2', name: 'Meta Minimal', category: 'FAANG', layout: 'single', fontFamily: 'font-sans', primaryColor: '#0668E1', secondaryColor: '#4b5563', headerAlignment: 'center', showImage: false },
  { id: 'f3', name: 'Amazon Leadership', category: 'FAANG', layout: 'single', fontFamily: 'font-serif', primaryColor: '#FF9900', secondaryColor: '#333333', headerAlignment: 'left', showImage: false },
  { id: 'f4', name: 'Apple Sleek', category: 'FAANG', layout: 'single', fontFamily: 'font-sans', primaryColor: '#000000', secondaryColor: '#86868b', headerAlignment: 'center', showImage: false },
  { id: 'f5', name: 'Netflix Bold', category: 'FAANG', layout: 'single', fontFamily: 'font-sans', primaryColor: '#E50914', secondaryColor: '#221f1f', headerAlignment: 'left', showImage: false },
  { id: 'f6', name: 'Microsoft Classic', category: 'FAANG', layout: 'single', fontFamily: 'font-sans', primaryColor: '#0078D4', secondaryColor: '#505050', headerAlignment: 'left', showImage: false },
  { id: 'f7', name: 'Stripe Developer', category: 'FAANG', layout: 'single', fontFamily: 'font-mono', primaryColor: '#635BFF', secondaryColor: '#425466', headerAlignment: 'left', showImage: false },
  { id: 'f8', name: 'Uber Executive', category: 'FAANG', layout: 'single', fontFamily: 'font-sans', primaryColor: '#000000', secondaryColor: '#545454', headerAlignment: 'split', showImage: false },
  { id: 'f9', name: 'Airbnb Creative', category: 'FAANG', layout: 'single', fontFamily: 'font-sans', primaryColor: '#FF5A5F', secondaryColor: '#484848', headerAlignment: 'left', showImage: false },
  { id: 'f10', name: 'Tesla Engineering', category: 'FAANG', layout: 'single', fontFamily: 'font-sans', primaryColor: '#CC0000', secondaryColor: '#333333', headerAlignment: 'center', showImage: false },

  // MNC (Two Column, Modern & Creative)
  { id: 'm1', name: 'Deloitte Professional', category: 'MNC', layout: 'two-column-left', fontFamily: 'font-sans', primaryColor: '#86BC25', secondaryColor: '#333333', headerAlignment: 'left', showImage: true, sidebarBg: '#000000', sidebarText: '#ffffff' },
  { id: 'm2', name: 'PwC Corporate', category: 'MNC', layout: 'two-column-left', fontFamily: 'font-serif', primaryColor: '#D04A02', secondaryColor: '#464646', headerAlignment: 'left', showImage: true, sidebarBg: '#f2f2f2', sidebarText: '#333333' },
  { id: 'm3', name: 'EY Modern', category: 'MNC', layout: 'two-column-right', fontFamily: 'font-sans', primaryColor: '#FFE600', secondaryColor: '#2e2e38', headerAlignment: 'left', showImage: true, sidebarBg: '#2e2e38', sidebarText: '#ffffff' },
  { id: 'm4', name: 'KPMG Classic', category: 'MNC', layout: 'two-column-left', fontFamily: 'font-sans', primaryColor: '#00338D', secondaryColor: '#483698', headerAlignment: 'center', showImage: true, sidebarBg: '#e6eaf4', sidebarText: '#00338D' },
  { id: 'm5', name: 'McKinsey Executive', category: 'MNC', layout: 'two-column-left', fontFamily: 'font-serif', primaryColor: '#051C2C', secondaryColor: '#53565a', headerAlignment: 'left', showImage: true, sidebarBg: '#051C2C', sidebarText: '#ffffff' },
  { id: 'm6', name: 'BCG Strategy', category: 'MNC', layout: 'two-column-right', fontFamily: 'font-sans', primaryColor: '#115740', secondaryColor: '#222222', headerAlignment: 'left', showImage: true, sidebarBg: '#f4f7f6', sidebarText: '#115740' },
  { id: 'm7', name: 'Bain Analytical', category: 'MNC', layout: 'two-column-left', fontFamily: 'font-sans', primaryColor: '#CC0000', secondaryColor: '#333333', headerAlignment: 'left', showImage: true, sidebarBg: '#f9f9f9', sidebarText: '#333333' },
  { id: 'm8', name: 'Accenture Tech', category: 'MNC', layout: 'two-column-right', fontFamily: 'font-sans', primaryColor: '#A100FF', secondaryColor: '#000000', headerAlignment: 'left', showImage: true, sidebarBg: '#000000', sidebarText: '#ffffff' },
  { id: 'm9', name: 'IBM Watson', category: 'MNC', layout: 'two-column-left', fontFamily: 'font-mono', primaryColor: '#0F62FE', secondaryColor: '#525252', headerAlignment: 'left', showImage: true, sidebarBg: '#f4f4f4', sidebarText: '#161616' },
  { id: 'm10', name: 'Cisco Network', category: 'MNC', layout: 'two-column-right', fontFamily: 'font-sans', primaryColor: '#00BCEB', secondaryColor: '#005073', headerAlignment: 'left', showImage: true, sidebarBg: '#005073', sidebarText: '#ffffff' },
];
