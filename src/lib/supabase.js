import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ibgqcprhxyywrwyykjgy.supabase.co/"
const supabaseKey = "sb_publishable_5cewlyW1IhkuQywp7fpzow_mLogGYL-"

export const supabase = createClient(supabaseUrl, supabaseKey)