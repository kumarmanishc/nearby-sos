import { v4 as uuidv4 } from 'uuid';
import { Ambulance, Doctor } from '../types';

// In-memory database - simulating the JSON server data
class Database {
  private ambulances: Ambulance[] = [];
  private doctors: Doctor[] = [];

  constructor() {
    this.seedData();
  }

  // Seed initial data
  private seedData(): void {
    // Seed ambulances
    this.ambulances = [
      {
        id: '1',
        title: 'Advanced Life Support Unit 01',
        description: 'Fully equipped ALS ambulance with cardiac monitor, ventilator, and advanced medications.',
        location: 'Station 1 - Downtown Fire Department',
        image: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=400&h=400&fit=crop',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      },
      {
        id: '2',
        title: 'Basic Life Support Unit 02',
        description: 'BLS ambulance for non-critical patient transport and basic emergency care.',
        location: 'Station 2 - North Side Medical Center',
        image: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=400&h=400&fit=crop',
        createdAt: new Date('2024-01-02'),
        updatedAt: new Date('2024-01-02'),
      },
      {
        id: '3',
        title: 'Critical Care Transport 03',
        description: 'Specialized ICU-level ambulance for critical patient transfers between hospitals.',
        location: 'Station 3 - Metro General Hospital',
        image: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=400&h=400&fit=crop',
        createdAt: new Date('2024-01-03'),
        updatedAt: new Date('2024-01-03'),
      },
      {
        id: '4',
        title: 'Pediatric Ambulance 04',
        description: 'Specialized ambulance equipped for pediatric emergencies with child-sized equipment.',
        location: 'Station 4 - Children\'s Hospital',
        image: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=400&h=400&fit=crop',
        createdAt: new Date('2024-01-04'),
        updatedAt: new Date('2024-01-04'),
      },
      {
        id: '5',
        title: 'Cardiac Response Unit 05',
        description: 'Specialized cardiac ambulance with 12-lead EKG, balloon pump, and cardiac medications.',
        location: 'Station 5 - Heart Institute',
        image: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=400&h=400&fit=crop',
        createdAt: new Date('2024-01-05'),
        updatedAt: new Date('2024-01-05'),
      },
      {
        id: '6',
        title: 'Trauma Response Unit 06',
        description: 'Heavy rescue ambulance equipped for major trauma and multi-casualty incidents.',
        location: 'Station 6 - Trauma Center',
        image: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=400&h=400&fit=crop',
        createdAt: new Date('2024-01-06'),
        updatedAt: new Date('2024-01-06'),
      },
      {
        id: '7',
        title: 'Air Medical Unit 07',
        description: 'Helicopter ambulance for rapid transport and access to remote locations.',
        location: 'Station 7 - Regional Airport',
        image: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=400&h=400&fit=crop',
        createdAt: new Date('2024-01-07'),
        updatedAt: new Date('2024-01-07'),
      },
      {
        id: '8',
        title: 'Mobile Stroke Unit 08',
        description: 'Specialized ambulance with CT scanner for rapid stroke diagnosis and treatment.',
        location: 'Station 8 - Neurological Institute',
        image: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=400&h=400&fit=crop',
        createdAt: new Date('2024-01-08'),
        updatedAt: new Date('2024-01-08'),
      },
      {
        id: '9',
        title: 'Neonatal Transport 09',
        description: 'Specialized unit for transporting critically ill newborns and premature infants.',
        location: 'Station 9 - Maternity Hospital',
        image: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=400&h=400&fit=crop',
        createdAt: new Date('2024-01-09'),
        updatedAt: new Date('2024-01-09'),
      },
      {
        id: '10',
        title: 'Hazmat Response Unit 10',
        description: 'Specialized ambulance for chemical, biological, and radiation emergency response.',
        location: 'Station 10 - Emergency Operations Center',
        image: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=400&h=400&fit=crop',
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-10'),
      },
      {
        id: '11',
        title: 'Bariatric Ambulance 11',
        description: 'Heavy-duty ambulance equipped for transporting patients over 400 pounds safely.',
        location: 'Station 11 - Specialized Transport',
        image: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=400&h=400&fit=crop',
        createdAt: new Date('2024-01-11'),
        updatedAt: new Date('2024-01-11'),
      },
      {
        id: '12',
        title: 'Mental Health Crisis Unit 12',
        description: 'Specialized ambulance with trained psychiatric technicians for mental health emergencies.',
        location: 'Station 12 - Mental Health Center',
        image: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=400&h=400&fit=crop',
        createdAt: new Date('2024-01-12'),
        updatedAt: new Date('2024-01-12'),
      },
    ];

    // Seed doctors
    this.doctors = [
      {
        id: '1',
        title: 'Dr. Sarah John',
        description: 'Emergency Medicine Specialist with 15 years of experience. Available 24/7 for critical care.',
        location: 'Central Hospital, Downtown',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&face',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      },
      {
        id: '2',
        title: 'Dr. Michael Chen',
        description: 'Trauma Surgeon specializing in emergency procedures and critical care.',
        location: 'Metro General Hospital',
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&face',
        createdAt: new Date('2024-01-02'),
        updatedAt: new Date('2024-01-02'),
      },
      {
        id: '3',
        title: 'Dr. Emily Rodriguez',
        description: 'Pediatric Emergency Specialist focused on children\'s emergency care.',
        location: 'Children\'s Medical Center',
        image: 'https://images.unsplash.com/photo-1594824804732-ca8db7d52b35?w=400&h=400&fit=crop&face',
        createdAt: new Date('2024-01-03'),
        updatedAt: new Date('2024-01-03'),
      },
      {
        id: '4',
        title: 'Dr. James Wilson',
        description: 'Cardiologist specializing in heart emergencies and cardiac arrest response.',
        location: 'Heart Institute, North Side',
        image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&face',
        createdAt: new Date('2024-01-04'),
        updatedAt: new Date('2024-01-04'),
      },
      {
        id: '5',
        title: 'Dr. Lisa Thompson',
        description: 'Neurologist specializing in stroke and brain injury emergency care.',
        location: 'Neuro Center, East Wing',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&face',
        createdAt: new Date('2024-01-05'),
        updatedAt: new Date('2024-01-05'),
      },
      {
        id: '6',
        title: 'Dr. Robert Kim',
        description: 'Orthopedic Surgeon for emergency bone and joint injuries.',
        location: 'Orthopedic Emergency Unit',
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&face',
        createdAt: new Date('2024-01-06'),
        updatedAt: new Date('2024-01-06'),
      },
      {
        id: '7',
        title: 'Dr. Amanda Davis',
        description: 'Emergency Psychiatrist for mental health crisis intervention.',
        location: 'Mental Health Emergency Center',
        image: 'https://images.unsplash.com/photo-1594824804732-ca8db7d52b35?w=400&h=400&fit=crop&face',
        createdAt: new Date('2024-01-07'),
        updatedAt: new Date('2024-01-07'),
      },
      {
        id: '8',
        title: 'Dr. David Brown',
        description: 'Anesthesiologist available for emergency surgeries and pain management.',
        location: 'Surgical Emergency Unit',
        image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&face',
        createdAt: new Date('2024-01-08'),
        updatedAt: new Date('2024-01-08'),
      },
      {
        id: '9',
        title: 'Dr. Jennifer Lee',
        description: 'Emergency Radiologist for urgent imaging and diagnostic services.',
        location: 'Emergency Imaging Center',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&face',
        createdAt: new Date('2024-01-09'),
        updatedAt: new Date('2024-01-09'),
      },
      {
        id: '10',
        title: 'Dr. Rachel Green',
        description: 'Emergency Pharmacist for critical medication management and poison control.',
        location: 'Emergency Pharmacy Unit',
        image: 'https://images.unsplash.com/photo-1594824804732-ca8db7d52b35?w=400&h=400&fit=crop&face',
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-10'),
      },
      {
        id: '11',
        title: 'Dr. Kevin White',
        description: 'Emergency ENT Specialist for airway emergencies and respiratory issues.',
        location: 'Respiratory Emergency Unit',
        image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&face',
        createdAt: new Date('2024-01-11'),
        updatedAt: new Date('2024-01-11'),
      },
      {
        id: '12',
        title: 'Dr. Susan Black',
        description: 'Emergency Infectious Disease Specialist for outbreak response and critical infections.',
        location: 'Infectious Disease Emergency Unit',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&face',
        createdAt: new Date('2024-01-12'),
        updatedAt: new Date('2024-01-12'),
      },
    ];
  }

  // Ambulance methods
  getAllAmbulances(): Ambulance[] {
    return [...this.ambulances];
  }

  getAmbulanceById(id: string): Ambulance | undefined {
    return this.ambulances.find(ambulance => ambulance.id === id);
  }

  createAmbulance(data: Omit<Ambulance, 'id' | 'createdAt' | 'updatedAt'>): Ambulance {
    const newAmbulance: Ambulance = {
      id: uuidv4(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.ambulances.push(newAmbulance);
    return newAmbulance;
  }

  updateAmbulance(id: string, data: Partial<Omit<Ambulance, 'id' | 'createdAt' | 'updatedAt'>>): Ambulance | undefined {
    const index = this.ambulances.findIndex(ambulance => ambulance.id === id);
    if (index === -1) return undefined;

    const existingAmbulance = this.ambulances[index]!; // Non-null assertion since we checked index
    this.ambulances[index] = {
      id: existingAmbulance.id,
      title: data.title ?? existingAmbulance.title,
      description: data.description ?? existingAmbulance.description,
      location: data.location ?? existingAmbulance.location,
      image: data.image ?? existingAmbulance.image,
      createdAt: existingAmbulance.createdAt,
      updatedAt: new Date(),
    };
    return this.ambulances[index];
  }

  deleteAmbulance(id: string): boolean {
    const index = this.ambulances.findIndex(ambulance => ambulance.id === id);
    if (index === -1) return false;

    this.ambulances.splice(index, 1);
    return true;
  }

  getAmbulanceCount(): number {
    return this.ambulances.length;
  }

  // Doctor methods
  getAllDoctors(): Doctor[] {
    return [...this.doctors];
  }

  getDoctorById(id: string): Doctor | undefined {
    return this.doctors.find(doctor => doctor.id === id);
  }

  createDoctor(data: Omit<Doctor, 'id' | 'createdAt' | 'updatedAt'>): Doctor {
    const newDoctor: Doctor = {
      id: uuidv4(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.doctors.push(newDoctor);
    return newDoctor;
  }

  updateDoctor(id: string, data: Partial<Omit<Doctor, 'id' | 'createdAt' | 'updatedAt'>>): Doctor | undefined {
    const index = this.doctors.findIndex(doctor => doctor.id === id);
    if (index === -1) return undefined;

    const existingDoctor = this.doctors[index]!; // Non-null assertion since we checked index
    this.doctors[index] = {
      id: existingDoctor.id,
      title: data.title ?? existingDoctor.title,
      description: data.description ?? existingDoctor.description,
      location: data.location ?? existingDoctor.location,
      image: data.image ?? existingDoctor.image,
      createdAt: existingDoctor.createdAt,
      updatedAt: new Date(),
    };
    return this.doctors[index];
  }

  deleteDoctor(id: string): boolean {
    const index = this.doctors.findIndex(doctor => doctor.id === id);
    if (index === -1) return false;

    this.doctors.splice(index, 1);
    return true;
  }

  getDoctorCount(): number {
    return this.doctors.length;
  }
}

// Singleton instance
export const database = new Database();