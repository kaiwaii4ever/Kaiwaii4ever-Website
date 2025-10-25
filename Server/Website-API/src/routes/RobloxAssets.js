const express = require('express');
const router = express.Router();
const axios = require('axios');

const GITHUB_CONFIG = {
  owner: 'Kaiwaii4ever',
  repo: 'Kaiwaii4ever-Assets',
  branch: 'master',
  basePath: 'Roblox'
};

async function githubRequest(path) {
  const url = `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${path}?ref=${GITHUB_CONFIG.branch}`;
  
  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Kaiwaii4ever-Asset-API'
      }
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || error.message 
    };
  }
}

async function getRawFile(path) {
  const url = `https://raw.githubusercontent.com/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/${GITHUB_CONFIG.branch}/${path}`;
  
  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`,
        'User-Agent': 'Kaiwaii4ever-Asset-API'
      }
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || error.message 
    };
  }
}

async function getAllFilesInDirectory(path, systemName = '') {
  const result = await githubRequest(path);
  
  if (!result.success) {
    return { success: false, error: result.error };
  }

  const files = [];
  
  for (const item of result.data) {
    if (item.type === 'file' && (item.name.endsWith('.lua') || item.name.endsWith('.luau'))) {
      const relativePath = item.path.replace(`${GITHUB_CONFIG.basePath}/${systemName}/`, '');
      
      files.push({
        name: item.name,
        path: item.path,
        relativePath: relativePath,
        downloadUrl: item.download_url
      });
    } else if (item.type === 'dir') {
      const subFiles = await getAllFilesInDirectory(item.path, systemName);
      if (subFiles.success) {
        files.push(...subFiles.files);
      }
    }
  }
  
  return { success: true, files };
}

router.get('/list', async (req, res) => {
  try {
    const result = await githubRequest(GITHUB_CONFIG.basePath);
    
    if (!result.success) {
      return res.status(500).json({ 
        error: 'Failed to fetch systems',
        details: result.error 
      });
    }

    const systems = result.data
      .filter(item => item.type === 'dir')
      .map(item => ({
        id: item.name,
        name: item.name,
        path: item.path
      }));

    res.json({ systems });
  } catch (error) {
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
});

router.get('/system/:systemName', async (req, res) => {
  try {
    const { systemName } = req.params;
    const systemPath = `${GITHUB_CONFIG.basePath}/${systemName}`;
    
    const filesResult = await getAllFilesInDirectory(systemPath, systemName);
    
    if (!filesResult.success) {
      return res.status(500).json({ 
        error: 'Failed to fetch system files',
        details: filesResult.error 
      });
    }

    res.json({
      system: systemName,
      files: filesResult.files
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
});

router.get('/file', async (req, res) => {
  try {
    const { path } = req.query;
    
    if (!path) {
      return res.status(400).json({ error: 'Path parameter is required' });
    }

    if (!path.startsWith(GITHUB_CONFIG.basePath)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const result = await getRawFile(path);
    
    if (!result.success) {
      return res.status(404).json({ 
        error: 'File not found',
        details: result.error 
      });
    }

    res.setHeader('Content-Type', 'text/plain');
    res.send(result.data);
  } catch (error) {
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
});

router.get('/system/:systemName/bundle', async (req, res) => {
  try {
    const { systemName } = req.params;
    const systemPath = `${GITHUB_CONFIG.basePath}/${systemName}`;
    
    const filesResult = await getAllFilesInDirectory(systemPath, systemName);
    
    if (!filesResult.success) {
      return res.status(500).json({ 
        error: 'Failed to fetch system files',
        details: filesResult.error 
      });
    }

    const fileContents = await Promise.all(
      filesResult.files.map(async (file) => {
        const content = await getRawFile(file.path);
        return {
          name: file.name,
          relativePath: file.relativePath,
          content: content.success ? content.data : null,
          error: content.success ? null : content.error
        };
      })
    );

    res.json({
      system: systemName,
      files: fileContents
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
});

router.get('/test-github', async (req, res) => {
  res.json({
    hasToken: !!process.env.GITHUB_TOKEN,
    tokenStart: process.env.GITHUB_TOKEN ? process.env.GITHUB_TOKEN.substring(0, 4) + '...' : 'missing',
    config: {
      owner: GITHUB_CONFIG.owner,
      repo: GITHUB_CONFIG.repo,
      branch: GITHUB_CONFIG.branch,
      basePath: GITHUB_CONFIG.basePath
    }
  });
});

module.exports = router;