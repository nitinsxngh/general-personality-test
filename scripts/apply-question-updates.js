#!/usr/bin/env node

/**
 * Script to apply question text updates directly to @bigfive-org/questions
 * Runs automatically after pnpm install via postinstall hook
 */

const fs = require('fs');
const path = require('path');

// Question updates mapping
const updates = {
  '458f3957-2359-4077-ade1-34525d633063': 'Love large gatherings',
  '5e8550d7-b8ef-4905-950a-f81d735d39e2': 'I often feel sad or low',
  '481efd08-c810-43b1-a952-f8ac9052f96b': 'I tend to do certain activities excessively at times',
  '79186f48-e7fa-4df4-b74b-b0627ee244e1': 'I generally prefer progressive political ideas',
  '08ff6dca-02a5-4aeb-aaa4-2ecf2526f143': 'I enjoy imagining unusual or creative scenarios',
  '9891b7ba-a494-4307-aafe-301d8db506c6': 'I generally keep my habits under control',
  '7df44711-4cd4-4b05-8830-73fcc3ebdab5': 'I feel confident about who I am',
  '13c58810-3864-42ba-aa87-d4166f858756': 'I feel overloaded when too many things happen at once',
  '743d8973-1de1-4485-91b4-8a5cf63e7d44': 'I often feel discouraged',
  '2452f034-8273-4f71-9122-a40f5ead31ba': 'I naturally step in to manage situations',
  'a354cf7c-8d11-46ac-acc5-da90d2048637': 'I tend to act quickly without much planning',
  '4fd25155-9cc2-4cd6-8852-3e0ca2d5e95d': 'I find it hard to relate to others\' emotions',
  'ea3327ea-3529-4be4-8e2d-2174731ae4d7': 'I often act impulsively'
};

// Find questions file in node_modules (works with npm and pnpm)
function findQuestionsFile() {
  const basePath = path.join(__dirname, '..', 'node_modules');
  
  // Try standard paths
  const possiblePaths = [
    path.join(basePath, '@bigfive-org', 'questions', 'data', 'en', 'questions.json'),
    path.join(basePath, '.pnpm', '@bigfive-org+questions@1.3.3', 'node_modules', '@bigfive-org', 'questions', 'data', 'en', 'questions.json'),
  ];

  for (const filePath of possiblePaths) {
    if (fs.existsSync(filePath)) {
      return filePath;
    }
  }

  // Search recursively for questions.json
  function searchDir(dir, depth = 0) {
    if (depth > 5) return null; // Limit search depth
    
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          // Check if this is the questions package
          if (entry.name.includes('@bigfive-org') || entry.name.includes('questions')) {
            const questionsPath = path.join(fullPath, 'data', 'en', 'questions.json');
            if (fs.existsSync(questionsPath)) {
              return questionsPath;
            }
            // Search nested
            const nested = searchDir(fullPath, depth + 1);
            if (nested) return nested;
          }
        }
      }
    } catch (err) {
      // Ignore permission errors
    }
    
    return null;
  }

  if (fs.existsSync(basePath)) {
    return searchDir(basePath);
  }

  return null;
}

function applyUpdates() {
  try {
    const questionsPath = findQuestionsFile();
    
    if (!questionsPath || !fs.existsSync(questionsPath)) {
      console.log('⚠ Questions file not found, skipping updates');
      return;
    }

    const questions = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));
    let updated = false;

    questions.forEach((question) => {
      if (updates[question.id] && question.text !== updates[question.id]) {
        question.text = updates[question.id];
        updated = true;
      }
    });

    if (updated) {
      fs.writeFileSync(questionsPath, JSON.stringify(questions, null, 2) + '\n', 'utf8');
      console.log('✓ Applied question text updates');
    } else {
      console.log('✓ Question texts already up to date');
    }
  } catch (error) {
    console.error('Error applying updates:', error.message);
    // Don't exit with error - allow build to continue
    process.exit(0);
  }
}

applyUpdates();

