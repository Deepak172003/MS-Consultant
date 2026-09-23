import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Employer } from '../employers/employer.entity';
import { Job, JobType } from '../jobs/job.entity';
import { Course } from '../courses/course.entity';
import { Candidate } from '../candidates/candidate.entity';
import { Application } from '../applications/application.entity';
import { ContactMessage } from '../contact/contact-message.entity';

dotenv.config();

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'ms_consultant',
  entities: [Employer, Job, Course, Candidate, Application, ContactMessage],
  synchronize: true,
});

async function seed() {
  await dataSource.initialize();
  console.log('Connected. Seeding...');

  const employerRepo = dataSource.getRepository(Employer);
  const jobRepo = dataSource.getRepository(Job);
  const courseRepo = dataSource.getRepository(Course);
  const candidateRepo = dataSource.getRepository(Candidate);

  const abc = await employerRepo.save(
    employerRepo.create({
      instituteName: 'ABC Academy',
      contactEmail: 'hr@abcacademy.in',
      contactPhone: '+91 90000 11111',
      location: 'Ranchi',
      verified: true,
    }),
  );
  const xyz = await employerRepo.save(
    employerRepo.create({
      instituteName: 'XYZ Institute',
      contactEmail: 'hr@xyzinstitute.in',
      contactPhone: '+91 90000 22222',
      location: 'Bokaro',
      verified: true,
    }),
  );
  const bfs = await employerRepo.save(
    employerRepo.create({
      instituteName: 'Bright Future School',
      contactEmail: 'hr@brightfuture.in',
      contactPhone: '+91 90000 33333',
      location: 'Ranchi',
      verified: false,
    }),
  );

  await jobRepo.save([
    jobRepo.create({
      title: 'Mathematics Faculty',
      location: 'Ranchi',
      salaryRange: '₹3–5 LPA',
      experience: '2+ Years',
      type: JobType.FULL_TIME,
      description:
        'We are looking for a passionate Mathematics Faculty member to join our team and help students build a rock-solid foundation for competitive exams and board results.',
      requirements: [
        "Bachelor's / Master's in Mathematics",
        'Teaching experience preferred',
        'Good communication skills',
      ],
      benefits: [
        'Competitive salary with performance bonus',
        'Paid study leave for certifications',
        'Access to digital teaching tools',
      ],
      applicationDeadline: '2026-09-30',
      employer: abc,
    }),
    jobRepo.create({
      title: 'Chemistry Faculty',
      location: 'Bokaro',
      salaryRange: '₹3–6 LPA',
      experience: '3+ Years',
      type: JobType.FULL_TIME,
      description:
        'XYZ Institute is hiring an experienced Chemistry Faculty to lead NEET and board-level batches, with a focus on conceptual clarity and lab-based learning.',
      requirements: [
        'M.Sc. in Chemistry',
        'NEET/board coaching experience',
        'Strong grasp of organic & physical chemistry',
      ],
      benefits: [
        'Housing allowance for outstation faculty',
        'Annual increments tied to results',
        'Well-equipped chemistry lab',
      ],
      applicationDeadline: '2026-09-28',
      employer: xyz,
    }),
    jobRepo.create({
      title: 'Physics Faculty',
      location: 'Ranchi',
      salaryRange: '₹3–5 LPA',
      experience: '2+ Years',
      type: JobType.FULL_TIME,
      description:
        'Bright Future School seeks a Physics Faculty member for senior secondary classes, with an emphasis on numerical problem-solving and JEE-style application questions.',
      requirements: [
        'B.Sc./M.Sc. in Physics, B.Ed preferred',
        'Experience with CBSE curriculum',
        'Ability to simplify tough concepts',
      ],
      benefits: [
        'School transport facility',
        'Health insurance coverage',
        'Smart-classroom infrastructure',
      ],
      applicationDeadline: '2026-10-05',
      employer: bfs,
    }),
  ]);

  await courseRepo.save([
    courseRepo.create({
      title: 'IIT-JEE Course',
      category: 'Engineering Entrance',
      tagline: 'Build a strong foundation for your future.',
      syllabus:
        'Complete Physics, Chemistry and Mathematics syllabus mapped to JEE Main & Advanced, with weekly problem-solving sessions and full-length mock tests.',
      duration: '12 Months',
      instructor: 'Expert Faculty',
      price: 15000,
      mode: 'Online / Offline',
    }),
    courseRepo.create({
      title: 'NEET Course',
      category: 'Medical Entrance',
      tagline: 'Master Biology, Physics and Chemistry for NEET.',
      syllabus:
        "NCERT-aligned Biology, Physics and Chemistry with diagram-based learning, weekly tests, and previous years' NEET paper practice.",
      duration: '12 Months',
      instructor: 'Dr. Verified Faculty',
      price: 16500,
      mode: 'Online / Offline',
    }),
    courseRepo.create({
      title: 'Board Level Course',
      category: 'School Level',
      tagline: 'Score higher in Class 10 & 12 board exams.',
      syllabus:
        'Chapter-wise CBSE/ICSE/JAC board coverage with sample papers, revision notes and doubt-clearing sessions before exams.',
      duration: '6 Months',
      instructor: 'Subject Specialists',
      price: 8000,
      mode: 'Online / Offline',
    }),
    courseRepo.create({
      title: 'Foundation Course',
      category: 'Early Foundation',
      tagline: 'Set up strong basics from Class 8–10.',
      syllabus:
        'Early groundwork in Maths and Science with a focus on conceptual clarity, building toward future JEE/NEET readiness.',
      duration: '12 Months',
      instructor: 'Foundation Faculty',
      price: 9500,
      mode: 'Online / Offline',
    }),
  ]);

  await candidateRepo.save(
    candidateRepo.create({
      fullName: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      phone: '+91 98765 43210',
      subjectSpecialisation: 'Mathematics',
    }),
  );

  console.log('Seed complete.');
  await dataSource.destroy();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
