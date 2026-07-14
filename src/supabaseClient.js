import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hzympuqmmygtiuprqlmq.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6eW1wdXFtbXlndGl1cHJxbG1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM5ODAyNDYsImV4cCI6MjA5OTU1NjI0Nn0.r3Vs_zn1zDWFVqX6jwrofZgjtZoSzuEYlC0l7YGEgF4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
export const BUCKET_NAME = 'uploads'
