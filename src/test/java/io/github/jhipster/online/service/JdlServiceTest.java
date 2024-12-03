/**
 * Copyright 2017-2024 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster Online project, see https://github.com/jhipster/jhipster-online
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.github.jhipster.online.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.ArgumentMatchers.nullable;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import io.github.jhipster.online.config.ApplicationProperties;
import io.github.jhipster.online.domain.Jdl;
import io.github.jhipster.online.domain.JdlMetadata;
import io.github.jhipster.online.domain.User;
import io.github.jhipster.online.domain.enums.GitProvider;
import io.github.jhipster.online.repository.JdlRepository;
import java.io.File;
import java.io.IOException;
import java.util.Optional;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest
@EnableConfigurationProperties(value = ApplicationProperties.class)
@TestPropertySource("classpath:config/application.yml")
class JdlServiceTest {

    @Mock
    private LogsService logsService;

    @Mock
    private GitService gitService;

    @Mock
    private JHipsterService jHipsterService;

    @Mock
    private GithubService githubService;

    @Mock
    private GitlabService gitlabService;

    @Mock
    private JdlRepository jdlRepository;

    @Autowired
    private ApplicationProperties applicationProperties;

    private JdlService jdlService;

    @BeforeEach
    void shouldConstructJHipsterService() {
        jdlService =
            new JdlService(logsService, gitService, jHipsterService, githubService, gitlabService, jdlRepository, applicationProperties);
    }

    @Test
    void applyJdlWithException() {
        final User user = new User();
        final String applyJdlId = "apply-id";
        final JdlMetadata jdlMetadata = new JdlMetadata();

        jdlService.applyJdl(user, "jhipster", "online", jdlMetadata, applyJdlId, GitProvider.GITHUB);

        verify(logsService).addLog(applyJdlId, "Error during generation: Error creating file jhipster-jdl.jh, could not write the file");
        verify(logsService).addLog(applyJdlId, "Generation failed");
    }

    @Test
    void applyGithubJdl() throws GitAPIException, IOException {
        final User user = new User();
        final String applyJdlId = "apply-id";
        final JdlMetadata jdlMetadata = new JdlMetadata();
        jdlMetadata.setId("1");
        Jdl jdl = mock(Jdl.class);
        jdlMetadata.setName("jdl-metadata-name");
        given(jdlRepository.findOneByJdlMetadataId(jdlMetadata.getId())).willReturn(Optional.of(jdl));
        given(githubService.getHost()).willReturn(applicationProperties.getGithub().getHost());

        jdlService.applyJdl(user, "jhipster", "online", jdlMetadata, applyJdlId, GitProvider.GITHUB);

        verifyApplyJdl(applyJdlId, jdlMetadata);
        verify(logsService).addLog(applyJdlId, "Cloning GitHub repository `jhipster/online`");
        verify(gitService).cloneRepository(eq(user), any(File.class), eq("jhipster"), eq("online"), eq(GitProvider.GITHUB));
        verify(logsService).addLog(applyJdlId, "Pushing the application to the GitHub remote repository");
        verify(gitService).push(nullable(Git.class), any(File.class), eq(user), eq("jhipster"), eq("online"), eq(GitProvider.GITHUB));
        verify(logsService).addLog(applyJdlId, "Creating Pull Request");
        verify(githubService)
            .createPullRequest(
                user,
                "jhipster",
                "online",
                "Add entities using the JDL model `jdl-metadata-name`",
                "jhipster-entities-apply-id",
                "Entities generated by JHipster using the model at https://start.jhipster.tech/jdl-studio/#!/view/1"
            );
        verify(logsService)
            .addLog(applyJdlId, "Pull Request created at " + applicationProperties.getGithub().getHost() + "/jhipster/online" + "/pull/0");
    }

    @Test
    void applyGitlabJdl() throws GitAPIException, IOException {
        final User user = new User();
        final String applyJdlId = "apply-id";
        final JdlMetadata jdlMetadata = new JdlMetadata();
        jdlMetadata.setId("1");
        Jdl jdl = mock(Jdl.class);
        jdlMetadata.setName("jdl-metadata-name");
        given(jdlRepository.findOneByJdlMetadataId(jdlMetadata.getId())).willReturn(Optional.of(jdl));
        given(gitlabService.getHost()).willReturn(applicationProperties.getGitlab().getHost());

        jdlService.applyJdl(user, "jhipster", "online", jdlMetadata, applyJdlId, GitProvider.GITLAB);

        verifyApplyJdl(applyJdlId, jdlMetadata);
        verify(logsService).addLog(applyJdlId, "Cloning GitLab repository `jhipster/online`");
        verify(gitService).cloneRepository(eq(user), any(File.class), eq("jhipster"), eq("online"), eq(GitProvider.GITLAB));
        verify(logsService).addLog(applyJdlId, "Pushing the application to the GitLab remote repository");
        verify(gitService).push(nullable(Git.class), any(File.class), eq(user), eq("jhipster"), eq("online"), eq(GitProvider.GITLAB));
        verify(logsService).addLog(applyJdlId, "Creating Merge Request");
        verify(gitlabService)
            .createPullRequest(
                user,
                "jhipster",
                "online",
                "Add entities using the JDL model `jdl-metadata-name`",
                "jhipster-entities-apply-id",
                "Entities generated by JHipster using the model at https://start.jhipster.tech/jdl-studio/#!/view/1"
            );
        verify(logsService)
            .addLog(
                applyJdlId,
                "Merge Request created at " + applicationProperties.getGitlab().getHost() + "/jhipster/online/merge_requests/0"
            );
    }

    @Test
    void kebabCaseJdlName() {
        JdlMetadata jdlMetadata = new JdlMetadata();
        jdlMetadata.setName("My Name");

        String result = jdlService.kebabCaseJdlName(jdlMetadata);

        assertThat(result).isEqualTo("my-name");
    }

    @Test
    void countAll() {
        jdlService.countAll();

        verify(jdlRepository).count();
    }

    @Test
    void deleteAllForJdlMetadata() {
        String jdlMetadataId = "id";

        jdlService.deleteAllForJdlMetadata(jdlMetadataId);

        verify(jdlRepository).deleteAllByJdlMetadataId(jdlMetadataId);
    }

    private void verifyApplyJdl(String applyJdlId, JdlMetadata jdlMetadata) throws GitAPIException, IOException {
        verify(logsService).addLog(applyJdlId, "Creating branch `jhipster-entities-apply-id`");
        verify(gitService).createBranch(nullable(Git.class), eq("jhipster-entities-apply-id"));
        verify(logsService).addLog(applyJdlId, "Adding JDL file into the project");
        verify(gitService, times(2)).addAllFilesToRepository(nullable(Git.class), any(File.class));
        verify(gitService)
            .commit(
                nullable(Git.class),
                any(File.class),
                eq("Add JDL Model `" + jdlMetadata.getName() + "`\n\nSee https://start.jhipster" + ".tech/jdl-studio/#!/view/1")
            );
        verify(logsService).addLog(applyJdlId, "Generating entities from JDL Model");
        verify(jHipsterService).runImportJdl(eq(applyJdlId), any(File.class), eq("jdl-metadata-name"));
        verify(gitService)
            .commit(
                nullable(Git.class),
                any(File.class),
                eq(
                    "Generate entities from JDL Model `" +
                    jdlMetadata.getName() +
                    "`\n\n" +
                    "See https://start.jhipster.tech/jdl-studio/#!/view/" +
                    jdlMetadata.getId()
                )
            );
        verify(logsService).addLog(applyJdlId, "Application successfully pushed!");

        verify(gitService).cleanUpDirectory(any(File.class));
        verify(logsService).addLog(applyJdlId, "Generation finished");
    }
}
